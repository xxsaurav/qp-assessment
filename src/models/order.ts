import { DataTypes, Model, Sequelize } from "sequelize";

export class Order extends Model {
  public id!: number;
  public userId!: number;
  public createdAt!: Date;
}

export function initOrder(sequelize: Sequelize): void {
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: "orders",
      sequelize,
    }
  );
}
