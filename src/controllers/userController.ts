import { Request, Response } from "express";
import { User } from "../models/user";
import { GroceryItem } from "../models";
import { Order } from "../models";
import { OrderItem } from "../models";

export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  return res.status(201).json(user);
};
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  return res.status(201).json(users);
};

export const listUserOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const orders = await Order.findAll({
    where: { userId },
    include: [{ model: OrderItem, include: [GroceryItem] }],
  });
  return res.status(200).json(orders);
};
