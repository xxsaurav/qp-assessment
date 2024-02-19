import { DataTypes, Model, Sequelize } from "sequelize";

export class OrderItem extends Model {
  public id!: number;
  public orderId!: number;
  public groceryItemId!: number;
  public quantity!: number;
}

export function initOrderItem(sequelize: Sequelize): void {
  OrderItem.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      groceryItemId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "order_items",
      sequelize,
    }
  );
}
