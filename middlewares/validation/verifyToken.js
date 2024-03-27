const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies?.token;
  // code:""
  // console.log(req);
  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).json({
      success: false,
      message: "Access denied please login or register to have access",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Access denied please login or register to have access",
      });
    } else {
      req.user = userData;
      return next();
    }
  });
}
module.exports = verifyToken;
