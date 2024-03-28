const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../error");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
async function isAdmin(req, res, next) {
  console.log("is author is hit");
  console.log(req.user);
  if (!req.user.isAdmin) {
    return next(
      new ResponseError(
        "You are not the you can't access this route",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  const user = await User.findOne({
    email: req.user.email,
    isAdmin: true,
  });

  if (!user) {
    return next(
      new ResponseError(
        "Username or password incorrect",
        StatusCodes.UNAUTHORIZED
      )
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
