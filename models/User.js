const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { StatusCodes } = require("http-status-codes");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
    },
    username: {
      type: String,
      required: true,
      minlength: 5,
    },
    password: {
      type: String,
      minlength: 4,
      required: [true, "Please provide a password"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    token: {
      type: String,
      unique: true,
    },
    tickets: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  if (!this.firstName || !this.password || !this.email) {
    return next(
      new ResponseError("please provide all fields", StatusCodes.BAD_REQUEST)
    );
  }
  const salt = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  this.token = uuid();
});
userSchema.methods.VerifyJwtToken = function (token, jwtOptions = {}) {
  return jwt.verify(token, process.env.JWT_SECRET, jwtOptions);
};

userSchema.methods.SignJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: `${this.firstName} + " " ${this.lastName}`,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET,
    {}
  );
};
userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
