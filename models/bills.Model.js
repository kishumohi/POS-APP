import mongoose from "mongoose";

const billSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      require: true,
    },
    customerNumber: {
      type: Number,
      require: true,
    },
    totalAmount: {
      type: Number,
      require: true,
    },
    subTotal: {
      type: Number,
      require: true,
    },
    tax: {
      type: Number,
      require: true,
    },
    paymentmode: {
      type: String,
      require: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamp: true,
  }
);

const Bills = mongoose.model("bills", billSchema);

export default Bills;
