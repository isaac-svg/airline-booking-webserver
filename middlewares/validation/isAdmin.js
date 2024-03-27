const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../error");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
async function isAdmin(req, res, next) {
  const { username, password, isAdmin } = req.body;
  console.log("is author is hit");
  if (!req.user.isAdmin) {
    return next(
      new ResponseError(
        "You are not the you can't access this route",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  const user = await User.findOne({ username: username, isAdmin: true });

  if (!user) {
    return next(
      new Response("Username or password incorrect", StatusCodes.UNAUTHORIZED)
    );
  }
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   return next(
  //     new ResponseError(
  //       "Username or password incorrect",
  //       StatusCodes.UNAUTHORIZED
  //     )
  //   );
  // } else {
  // }
  next();
}

module.exports = isAdmin;
