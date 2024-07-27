import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    userid: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    verified: {
      type: Boolean,
    },
  },
  {
    timestamp: true,
  }
);

const Users = mongoose.model("user", userSchema);

export default Users;
