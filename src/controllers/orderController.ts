import { Request, Response } from "express";
import { Order, User, sequelize } from "../models";
import { OrderItem } from "../models";
import { GroceryItem } from "../models";

export const placeOrder = async (req: Request, res: Response) => {
  const { userId, items } = req.body; // Starting a transaction
  const t = await sequelize.transaction();

  try {
    // Verify user exists
    const userExists = await User.count({
      where: { id: userId },
      transaction: t,
    });
    if (!userExists) throw new Error("User not found");

    // Check inventory for each item
    for (const item of items) {
      const groceryItem = await GroceryItem.findByPk(item.groceryItemId, {
        transaction: t,
      });
      if (!groceryItem)
        throw new Error(`Item not found: ${item.groceryItemId}`);
      if (groceryItem.inventoryCount < item.quantity) {
        throw new Error(`Not enough inventory for item: ${groceryItem.name}`);
      }

      groceryItem.inventoryCount -= item.quantity;
      await groceryItem.save({ transaction: t });
    }

    // Create order
    const order = await Order.create({ userId }, { transaction: t });

    const createdOrderItems = items.map((item: any) => ({
      ...item,
      orderId: order.id,
    }));
    await OrderItem.bulkCreate(createdOrderItems, { transaction: t });

    // If all operations were successful, commit the transaction
    await t.commit();

    return res.status(201).json(order);
  } catch (error) {
    // If any operation fails, rollback the transaction
    await t.rollback();
    throw new Error("Failed to create order");
  }
};
export const listAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.findAll({
    include: [{ model: OrderItem, include: [GroceryItem] }],
  });
  return res.status(200).json(orders);
};
