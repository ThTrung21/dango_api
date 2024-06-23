import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { User, Role } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public role: Role;

  public id?: number;
  public password: string;
  public fullname: string;
  public dob: Date;
  public address: string;
  public phone: string;
  public orderHistory: string[];
  public email: string;
  public likeddish: string[];
  public avatar?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
const initModel = (sequelize: Sequelize): typeof UserModel => {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      fullname: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      dob: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      address: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      role: {
        defaultValue: Role.CUSTOMER,
        type: DataTypes.ENUM(...Object.values(Role)),
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING(500),
      },
      orderHistory: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      likeddish: {
        allowNull: true,
        type: DataTypes.JSON,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      sequelize,
      paranoid: true,
    },
  );

  return UserModel;
};

export default initModel;
