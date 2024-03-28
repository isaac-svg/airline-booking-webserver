const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function login(req, res, next) {
  const { email, password } = req.body;
  console.log(req.body, "login side");
  try {
    if (!email || !password) {
      return next(
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Please provide email and password",
          success: false,
        })
      );
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email or password incorrect", success: false });
    }
    const isMatch = await user.isPasswordMatch(password);
    console.log(isMatch);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email or password incorrect", success: false });
    }
    const token = user.SignJwtToken();
    // console.log(token);
    const payload = {
      email: user["email"],
      firstname: user["firstName"],
      createdAt: user["createdAt"],
      code: user["token"],
      id: user["id"],
      username: user["username"],
      isAdmin: user["isAdmin"],
    };
    return res
      .cookie("token", token)
      .status(StatusCodes.OK)
      .json({ success: true, message: "ok", payload });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(error.message, StatusCodes.BAD_REQUEST);
  }
}

module.exports = { login };
