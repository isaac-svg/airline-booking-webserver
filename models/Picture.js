const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const ResponseError = require("../middlewares/error");
const mongoosePaginate = require("mongoose-paginate-v2");

const ImageSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      enum: [
        "engineering",
        "software",
        "agriculture",
        "medicine",
        "mathematics",
        "social",
        "science",
        "general",
      ],
      type: String,
    },
  },
  { timestamps: true }
);

ImageSchema.plugin(mongoosePaginate);

ImageSchema.pre("save", function (next) {
  if (!this.isModified(["image", "category"])) {
    return next(
      new ResponseError("No field is modified", StatusCodes.NO_CONTENT)
    );
  }
  next();

  // else{
  //     const data = this.getUpdate();

  //     this.findByIdAndUpdate(this._id,data,{new:true}).exec();
  //     next()
  // }
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
