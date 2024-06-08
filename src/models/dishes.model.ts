import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Dish } from '@/interfaces/dishes.interface';

export type DishCreationAttributes = Optional<Dish, 'id'>;
export class DishModel extends Model<Dish, DishCreationAttributes> implements Dish {
  public id: number;
  public name: string;

  public description: string;
  public images: string[];
  public productid: number[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
const initModel = (sequelize: Sequelize): typeof DishModel => {
  DishModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      images: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      productid: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      tableName: 'dishes',
      timestamps: true,
      paranoid: true,
      sequelize,
    },
  );
  return DishModel;
};
export default initModel;
