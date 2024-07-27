import UserModal from "../models/user.Model.js";

export const loginController = async (req, res) => {
  const { userid, password } = req.body;

  try {
    // console.log("Request Body:", req.body);

    const user = await UserModal.findOne({
      $or: [{ userid }, { password }],
    });
    // console.log("User found:", user);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).json({
        message: "Login Failed",
        user,
      });
    }
  } catch (error) {
    console.log("Controller-Error in Login:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const registerController = async (req, res) => {
  try {
    const newUser = new UserModal({ ...req.body, verified: true });
    await newUser.save();
    res.status(201).send("New User Added Successfully!");
  } catch (error) {
    console.log("Controller-Error in Register :- ", error);
  }
};
