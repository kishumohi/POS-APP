import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      // require: true,
    },
  },
  {
    timestamp: true,
  }
);

const Items = mongoose.model("Items", itemSchema);

export default Items;
