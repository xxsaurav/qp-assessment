import { Request, Response } from "express";
import { GroceryItem } from "../models";

export const listGroceryItems = async (req: Request, res: Response) => {
  const items = await GroceryItem.findAll();
  return res.status(200).json(items);
};
export const addGroceryItem = async (req: Request, res: Response) => {
  const item = await GroceryItem.create(req.body);
  return res.status(201).json(item);
};

export const updateGroceryItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [updated] = await GroceryItem.update(req.body, { where: { id } });

  if (updated) {
    const updatedItem = await GroceryItem.findOne({ where: { id } });
    return res.status(200).json(updatedItem);
  }

  throw new Error("Grocery item not found");
};

export const viewGroceryItems = async (req: Request, res: Response) => {
  const items = await GroceryItem.findAll();
  return res.status(200).json(items);
};

export const removeGroceryItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await GroceryItem.destroy({ where: { id } });

  if (deleted) {
    return res.status(204).send();
  }

  throw new Error("Grocery item not found");
};

export const manageInventory = async (req: Request, res: Response) => {
  const { id, inventoryCount } = req.body;
  const [updated] = await GroceryItem.update(
    { inventoryCount },
    { where: { id } }
  );

  if (updated) {
    const updatedItem = await GroceryItem.findOne({ where: { id } });
    return res.status(200).json(updatedItem);
  }

  throw new Error("Grocery item not found");
};
