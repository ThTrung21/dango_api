import { DB } from '@/database';
import { Role } from '@/interfaces/auth.interface';
import moment from 'moment-timezone';
import { Op, WhereOptions } from 'sequelize';
import { Service } from 'typedi';

@Service()
export class GeneralService {
  public async getStatistics() {
    const { Sequelize, Product, Order, OrderItem, User } = DB;
    const now = moment.tz('Asia/Ho_Chi_Minh');
    const sevenDaysAgo = moment(now).subtract(7, 'days').toDate();

    const totalProducts = await Product.count(); // có hàm count để đếm
    const totalOrders = await Order.findAll({
      attributes: [
        [Sequelize.fn('date', Sequelize.col('created_at')), 'Date'], // para thứ nhất là gì, para thứ 2 là lấy cột nào, para thứ 3 chắc là tên của cột đó
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'TotalOrders'],
      ],
      where: Sequelize.where(Sequelize.col('created_at'), {
        [Op.lt]: new Date(),
        [Op.gt]: sevenDaysAgo,
      }),
      group: ['Date'],
      order: [[Sequelize.col('Date'), 'ASC']],
    });

    const totalProfit = await OrderItem.findAll({
      attributes: [
        [Sequelize.fn('date', Sequelize.col('OrderItemModel.created_at')), 'Date'],
        [Sequelize.literal(`sum(total_price)`), 'revenue'],
        [Sequelize.literal(`sum(total_price) - sum(import_price*quantity)`), 'profit'],
      ],
      include: {
        model: Product,
        attributes: [],
      },
      where: Sequelize.where(Sequelize.col('OrderItemModel.created_at'), {
        [Op.lt]: new Date(),
        [Op.gt]: sevenDaysAgo,
      }),
      group: ['Date'],
      order: [[Sequelize.col('Date'), 'ASC']],
    });

    const totalCustomer = await User.count({
      where: {
        role: Role.CUSTOMER,
      },
    });

    return {
      totalProducts,
      totalCustomer,
      totalOrders,
      totalProfit,
    };
  }

  // public async getRevenueByCategory() {
  //   const { Sequelize, OrderItem } = DB;

  //   const sevenDaysAgo = new Date();
  //   sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  //   const orderItems = await OrderItem.findAll({
  //     attributes: [
  //       [Sequelize.fn('SUM', Sequelize.col('total_price')), 'Revenue'],
  //       [Sequelize.fn('date', Sequelize.col('OrderItemModel.created_at')), 'Date'],
  //     ],
  //     include: {
  //       model: DB.Product,
  //       attributes: ['category_id'],
  //     },
  //     where: Sequelize.where(Sequelize.col('OrderItemModel.created_at'), {
  //       [Op.lt]: new Date(),
  //       [Op.gt]: sevenDaysAgo,
  //     }),
  //     group: ['Date', 'category_id'],
  //   });

  //   return orderItems;
  // }
  public async getRevenueByCategory() {
    const { Sequelize, OrderItem, Product } = DB;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const whereClause: WhereOptions = {
      created_at: {
        // Specify the table alias or name
        [Op.lt]: new Date(),
        [Op.gt]: sevenDaysAgo,
      },
    };

    const orderItems = await OrderItem.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('total_price')), 'Revenue'],
        [Sequelize.fn('date', Sequelize.col('OrderItemModel.created_at')), 'Date'],
        [Sequelize.col('ProductModel.category_id'), 'category_id'], // Include category_id in SELECT clause
      ],
      include: {
        model: Product,
        attributes: [], // Do not select ProductModel.id directly
      },
      where: whereClause,
      group: ['Date', 'ProductModel.category_id'], // Group by Date and category_id
    });

    return orderItems;
  }

  public async getOrderInTimeline() {
    const { Sequelize, Order } = DB;
    const now = moment.tz('Asia/Ho_Chi_Minh');
    const sevenDaysAgo = moment(now).subtract(7, 'days');

    const orders = await Order.findAll({
      attributes: {
        exclude: ['deletedAt', 'updatedAt'],
        include: [
          [
            DB.sequelize.literal(`
            (SELECT SUM(total_price) 
            FROM order_items 
            WHERE order_items.order_id = OrderModel.id)
          `),
            'totalPrice',
          ],
        ],
      },
      where: Sequelize.where(Sequelize.col('created_at'), {
        [Op.lt]: now.toDate(),
        [Op.gt]: sevenDaysAgo.toDate(),
      }),
      order: [[Sequelize.col('created_at'), 'DESC']],
    });
    const groupByDate = orders.reduce((acc, order) => {
      const date = moment(order.createdAt).format('DD/MM/YYYY');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(order);
      return acc;
    }, {});

    return groupByDate;
  }
}
