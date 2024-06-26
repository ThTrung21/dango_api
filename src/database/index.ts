/* eslint-disable prettier/prettier */
//const { Sequelize } = require('sequelize');
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PASS } from '@config';

import UserModel from '@/models/users.model';
import OrderModel from '@/models/orders.model';
import ProductModel from '@/models/products.model';

import CategoriesModel from '@/models/categories.model';
import BrandsModel from '@/models/brands.model';
import OrderItemModel from '@/models/order-items.model';
import DishModel from '@/models/dishes.model';
import { logger } from '@/utils/logger';
import { readFileSync } from 'fs';
import { join } from 'path';

import Sequelize from 'sequelize';

console.log({ DB_DATABASE, DB_USER, DB_PASSWORD, DB_PASS });

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  timezone: '+07:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },

  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
  attributeBehavior: 'unsafe-legacy',

  // dialectOptions: {
  //   ssl: {
  //     ca: readFileSync(join(__dirname, 'DigiCertGlobalRootCA.crt.pem')).toString(),
  //   },
  // },
});
sequelize.authenticate();

const initAllModels = (sequelize: Sequelize.Sequelize) => {
  const OrderItem = OrderItemModel(sequelize);
  const Product = ProductModel(sequelize);
  const Categories = CategoriesModel(sequelize);
  const Order = OrderModel(sequelize);
  const User = UserModel(sequelize);
  const Brands = BrandsModel(sequelize);
  const Dish = DishModel(sequelize);

  // order_item and order
  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

  //brands and products
  Brands.hasMany(Product, { foreignKey: 'brandId' });
  Product.belongsTo(Brands, { foreignKey: 'brandId' });

  //categories and products
  Categories.hasMany(Product, { foreignKey: 'categoryId' });
  Product.belongsTo(Categories, { foreignKey: 'categoryId' });

  //products and an order_item
  Product.hasMany(OrderItem, { foreignKey: 'productId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });

  //users and orders
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  return {
    OrderItem,
    Product,
    Categories,
    Order,
    User,
    Brands,
    Dish,
  };
};

export const DB = {
  ...initAllModels(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
