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
