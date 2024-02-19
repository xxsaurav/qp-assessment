import { Model, DataTypes, Sequelize } from "sequelize";

export class GroceryItem extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public inventoryCount!: number;
}

export function initGroceryItem(sequelize: Sequelize): void {
  try {
    console.log("Initializing grocery item model...");

    GroceryItem.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        description: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        inventoryCount: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: "grocery_items",
        sequelize,
      }
    );

    console.log("Grocery item model initialized successfully.");
  } catch (error) {
    console.error("Error initializing grocery item model:", error);
  }
}
