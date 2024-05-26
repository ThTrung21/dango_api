import { Order, OrderStatus } from '@/interfaces/orders.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type OrderCreationAttributes = Optional<Order, 'id'>;
export class OrderModel extends Model<Order, OrderCreationAttributes> implements Order {
  public id: number;
  public status: OrderStatus;
  public userId: number;
  public orderAddress: string;
  public orderName: string;
  public orderPhone: string;

  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

const initModel = (sequelize: Sequelize): typeof OrderModel => {
  OrderModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        defaultValue: OrderStatus.PENDING,
        type: DataTypes.ENUM(...Object.values(OrderStatus)),
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      orderAddress: {
        allowNull: false,
        type: DataTypes.STRING(225),
      },
      orderName: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      orderPhone: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: 'orders',
      timestamps: true,
      paranoid: true,
      sequelize,
    },
  );

  return OrderModel;
};

export default initModel;
