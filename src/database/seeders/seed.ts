import { logger } from '@/utils/logger';
import { DB } from '../index';
import { UserService } from '@/services/users.service';
import { User } from '@/interfaces/users.interface';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '@/dtos/users.dto';
import { Product } from '@/interfaces/products.interface';
import { CreateProductDto } from '@/dtos/products.dto';
import { ProductService } from '@/services/products.service';
import { OrderService } from '@/services/orders.service';
import { CreateOrderDto, ProductItem } from '@/dtos/orders.dto';
import { CreateReviewDto } from '@/dtos/reviews.dto';
import { CategoryService } from '@/services/categories.service';
import { Role } from '@/interfaces/auth.interface';
import { OrderStatus } from '@/interfaces/orders.interface';
import moment from 'moment-timezone';
import { PRODUCT_IMG } from './constant-urls';

interface SeedAmount {
  users: number;
  products: number;
  ordersPerUser: number;
  itemsPerOrder: number;
}
function getRandomElement(arr: string[]): string {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
class Seeder {
  private seedingAmount: SeedAmount;
  private userService = new UserService();
  private productService = new ProductService();
  private orderService = new OrderService();
  private categoryService = new CategoryService();
  private orderModel = DB.Order;
  private orderItemMode = DB.OrderItem;
  constructor(amount: SeedAmount) {
    this.seedingAmount = amount;
  }
  private async SeedUsers() {
    try {
      const { users } = this.seedingAmount;
      const creationPromises: Promise<User>[] = [];
      const district = [
        'District 1',
        'District 2',
        'District 3',
        'District 4',
        'District 5',
        'District 6',
        'District 7',
        'District 8',
        'District 9',
        'District 10',
        'District 11',
        'District 12',
        'Binh Tan',
        'Binh Thanh',
        'Go Vap',
        'Phu Nhuan',
        'Tan Binh',
        'Tan Phu',
        'Thu Duc',
        'Nha Be',
        'Can Gio',
        'Cu Chi',
        'Hoc Mon',
        'Binh Chanh',
      ];
      for (let i = 0; i < users; i++) {
        const newUser: CreateUserDto = {
          fullname: faker.person.fullName(),
          email: faker.internet.email(),
          password: '123456',
          phone: faker.phone.number('+84 ## ### ## ##'),
          dob: faker.date.past(),
          // eslint-disable-next-line prettier/prettier
          address: faker.location.streetAddress() + ', ' + getRandomElement(district) + ', HCM',
          role: i == 0 ? Role.ADMIN : Role.CUSTOMER,
        };

        creationPromises.push(this.userService.createUser(newUser));
      }

      await Promise.all(creationPromises);
      logger.info('User seeding successfully!');
    } catch (error) {
      logger.error('User seeding error!');
      throw error;
    }
  }
  private async SeedOrders() {
    try {
      const { products, ordersPerUser, itemsPerOrder } = this.seedingAmount;

      const usersList = await this.userService.findAllUser();
      await Promise.all(
        usersList.map(async user => {
          for (let i = 0; i < ordersPerUser; i++) {
            let prodId = 0;
            const productItems: ProductItem[] = Array(itemsPerOrder)
              .fill(null)
              .map(() => {
                prodId = prodId + faker.number.int({ min: 1, max: 6 });
                const productId = prodId;
                const quantity = faker.number.int({ min: 1, max: 5 });

                return { productId, quantity };
              });

            const dto: CreateOrderDto = {
              products: productItems,
              orderAddress: faker.location.streetAddress(),
              orderName: faker.person.fullName(),
              orderPhone: faker.phone.number('+84 ## ### ## ##'),
              status: Object.values(OrderStatus)[faker.number.int({ min: 0, max: 2 })],
            };

            await this.orderService.createOrder(dto, user.id);
          }
        }),
      );

      logger.info('Order seeding successfully!');
    } catch (error) {
      logger.error('Order seeding error!');
      throw error;
    }
  }
  private async SeedProducts() {
    try {
      const { products } = this.seedingAmount;

      const brands = Array(7)
        .fill(null)
        .map(() => faker.company.name());

      for (let i = 0; i < products; i++) {
        const category = faker.number.int({ min: 1, max: 14 });

        const imgs_src = PRODUCT_IMG;

        const imgsSet = new Set<string>();
        while (imgsSet.size < 3) {
          imgsSet.add(imgs_src[faker.number.int({ min: 0, max: imgs_src.length - 1 })]);
        }

        const newProducts: CreateProductDto = {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: Number(faker.commerce.price({ max: 120000, min: 8000 })),
          importPrice: Number(faker.commerce.price({ max: 100000 })),
          brandName: brands[faker.number.int({ min: 0, max: 6 })],
          images: [...imgsSet],
          categoryId: category,
          stock: faker.number.int({ min: 20, max: 100 }),
          sold: 0,
        };

        await this.productService.createProduct(newProducts);
      }

      logger.info('Product seeding successfully!');
    } catch (error) {
      logger.error('Product seeding error!');
      throw error;
    }
  }
  private async SeedCategories() {
    await this.categoryService.CreateCategory({
      name: 'Beef',
    });

    await this.categoryService.CreateCategory({
      name: 'Dairy',
    });
    await this.categoryService.CreateCategory({
      name: 'Detergent',
    });
    await this.categoryService.CreateCategory({
      name: 'Drink',
    });

    await this.categoryService.CreateCategory({
      name: 'Egg',
    });
    await this.categoryService.CreateCategory({
      name: 'Food',
    });
    await this.categoryService.CreateCategory({
      name: 'Fruit',
    });
    await this.categoryService.CreateCategory({
      name: 'Hygiene',
    });
    await this.categoryService.CreateCategory({
      name: 'Laundry',
    });
    await this.categoryService.CreateCategory({
      name: 'Pork',
    });

    await this.categoryService.CreateCategory({
      name: 'Poultry',
    });

    await this.categoryService.CreateCategory({
      name: 'Seafood',
    });

    await this.categoryService.CreateCategory({
      name: 'Spice',
    });

    await this.categoryService.CreateCategory({
      name: 'Vegetable',
    });
  }
  private async ModifyCreatedDate() {
    const orders = await this.orderModel.findAll();

    const now = moment.tz('Asia/Ho_Chi_Minh');
    await Promise.all(
      orders.map(async order => {
        const randomDay = moment(now)
          .clone()
          .subtract(faker.number.int({ min: 1, max: 7 }), 'days')
          .toDate();
        await DB.Order.update({ createdAt: randomDay }, { where: { id: order.id } });
      }),
    );

    const orderItems = await this.orderItemMode.findAll();

    await Promise.all(
      orderItems.map(orderItem => {
        const randomDay = moment(now)
          .clone()
          .subtract(faker.number.int({ min: 1, max: 7 }), 'days')
          .toDate();
        return DB.OrderItem.update({ createdAt: randomDay }, { where: { id: orderItem.id } });
      }),
    );
    logger.info('Modify created date successfully!');
  }
  public async seedAll() {
    await this.SeedUsers();
    await this.SeedCategories();
    await this.SeedProducts();
    await this.SeedOrders();
    await this.ModifyCreatedDate();
  }
}
(async () => {
  try {
    await DB.sequelize.sync({ force: true, alter: true });
    const seeder = new Seeder({
      users: 10,
      products: 32,
      ordersPerUser: 5,
      itemsPerOrder: 3,
    });
    await seeder.seedAll();

    logger.info('Seeding successfully!');
  } catch (error) {
    logger.error('Seeding failed!');
    console.log(error);
  } finally {
    DB.sequelize.close();
    process.exit();
  }
})();
