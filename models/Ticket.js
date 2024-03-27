const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { v4: uuid } = require("uuid");
const ResponseError = require("../middlewares/error");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("./User");
//
const ticketSchema = new mongoose.Schema({
  flightcode: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  departureTime: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
    default: false,
  },
  message: {
    type: String,
  },
  originCountry: {
    type: String,
    required: true,
  },
  destinationCountry: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  terminal: {
    type: String,
    required: true,
  },
  gate: {
    type: String,
    required: true,
  },
});

ticketSchema.plugin(mongoosePaginate);
ticketSchema.methods.VerifyJwtToken = function (token, jwtOptions = {}) {
  return jwt.verify(token, process.env.JWT_SECRET, jwtOptions);
};
ticketSchema.pre("save", function (next) {
  if (this.code === "") {
    return next(
      new ResponseError(
        "Please make sure you have the permission to be on this page of the app",
        StatusCodes.UNAUTHORIZED
      )
    );
  }
  this.code = uuid();
  next();
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
