const User = require("../../models/User");

const { StatusCodes } = require("http-status-codes");

async function register(req, res, next) {
  const { firstName, lastName, password: pass, email } = req.body;
  console.log(req.body, "request body");
  try {
    // console.info(req.body);
    const newUser = new User({
      firstName,
      lastName,
      password: pass,
      email,
      username: firstName + " " + lastName,
    });
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    return res.status(StatusCodes.OK).json({
      others,
    });
  } catch (error) {
    return new Error(error.message, StatusCodes.BAD_REQUEST);
  }
}
module.exports = { register };
