const User = require("../model/UserModel");
const {
  encryptPassword,
  comparePassword,
} = require("../utils/encryptPassword");

exports.createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: {},
      });
    }

    // We are creating add edit in same route. If we pass id then it will go to update otherwise it will go in add
    if (req.body.id) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.body.id },
        { $set: req.body },
        { new: true }
      );
      return res.status(201).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } else {
      const newpassword = await encryptPassword(req.body.password);
      const user = await new User(req.body).save();
      return res.status(200).json({
        success: true,
        message: "New user created successfully",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        success: true,
        message: "Enter email id and password",
        data: {},
      });
    }
    const user = await User.findOne({ email }).select("+password");

    /* Bydefault password select is false. becuase we did password select false in User model\
     If we did multiple field false. and if we want mutilple field then write .select("+password +gender")
    */

    if (!user) {
      return res.status(404).json({
        success: true,
        message: "Invalid email or password",
        data: {},
      });
    }

    if (await comparePassword(password, user.password)) {
      return res.status(200).json({
        success: true,
        message: "Login successfully",
        data: user,
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "Invalid email or password",
        data: {},
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: 0 });

    /*
    if we dont want some field then we can write this. in first perameter it will take the condition from what bases we have to find
    const users = await User.find({},{password:0});
    */

    return res.status(200).json({
      success: true,
      message: "User list fetch successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
        data: {},
      });
    }
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with given id",
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetch successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
        data: {},
      });
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: 1 } }
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with given id",
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
