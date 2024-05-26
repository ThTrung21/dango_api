import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Product } from '@/interfaces/products.interface';

export type ProductCreationAttributes = Optional<Product, 'id'>;

export class ProductModel extends Model<Product, ProductCreationAttributes> implements Product {
  public id: number;
  public categoryId: number;
  public brandId: number;

  public name: string;
  public stock: number;
  public price: number;
  public importPrice: number;
  public sold: number;

  public description: string;
  public images: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

const initModel = (sequelize: Sequelize): typeof ProductModel => {
  ProductModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      brandId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },

      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      importPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      sold: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },

      images: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(225),
      },
    },
    {
      tableName: 'products',
      timestamps: true,
      paranoid: true,
      sequelize,
    },
  );

  return ProductModel;
};

export default initModel;
