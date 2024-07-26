import ItemModel from "../models/item.Model.js";

import("colors");
export const getItemController = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(`Get-Item Controller Error :- ${error}`.bgRed.inverse);
  }
};

export const addItemController = async (req, res) => {
  try {
    const newitem = new ItemModel(req.body);
    // console.log(newitem);
    await newitem.save();
    res.status(201).json({ message: "Item Created Successfully!", newitem });
    // res.status(201).send.json(newitem);
  } catch (error) {
    res.status(400).send("Error in Add Item", error);
    console.log(`Add-Item Controller Error :- ${error}`.bgRed.inverse);
  }
};

export const editItemController = async (req, res) => {
  try {
    await ItemModel.findOneAndUpdate({ _id: req.body.itemid }, req.body);
    res.status(201).send("Item Updated!");
  } catch (error) {
    res.status(400).send("Error in Item Edit", error);
  }
};

export const deleteItemController = async (req, res) => {
  try {
    const { itemid } = req.body;
    await ItemModel.findOneAndDelete({ _id: itemid });
    res.status(201).send("Item Deleted!");
  } catch (error) {
    res.status(400).send("Error in Item Delete", error);
  }
};
