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
        res.json("Please provide email and password", StatusCodes.BAD_REQUEST)
      );
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json("email or password incorrect");
    }
    const isMatch = await user.isPasswordMatch(password);
    console.log(isMatch);
    if (!isMatch) {
      return res.json("email or password incorrect", StatusCodes.BAD_REQUEST);
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
      .json({ success: true, message: "ok", payload });
  } catch (error) {
    res.json(error.message, StatusCodes.BAD_REQUEST);
  }
}

module.exports = { login };
