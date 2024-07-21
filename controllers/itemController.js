import Items from "../models/item.Model.js";

import("colors");
export const getItemController = async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(`Item Controller Error :- ${error}`.bgRed.inverse);
  }
};
