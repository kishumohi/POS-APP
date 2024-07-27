import BillsModel from "../models/bills.Model.js";

export const addBillsController = async (req, res) => {
  try {
    const newbills = new BillsModel(req.body);
    // console.log(newitem);
    await newbills.save();
    res.status(201).json({ message: "Bills Created Successfully!", newbills });
    // res.status(201).send.json(newitem);
  } catch (error) {
    res.status(400).send("Error in Add Bills", error);
    console.log(`Add-Bills Controller Error :- ${error}`.bgRed.inverse);
  }
};

export const getBillsController = async (req, res) => {
  try {
    const bills = await BillsModel.find();
    res.status(200).send(bills);
  } catch (error) {
    console.log(`Controller - Get-Bills Error :- ${error}`.bgRed.inverse);
  }
};
