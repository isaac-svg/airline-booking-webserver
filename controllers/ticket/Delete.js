const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");
const Ticket = require("../../models/Ticket");

async function deleteTicket(req, res, next) {
  const { code, flightcode } = req.body;
  console.log(req.body, "request body");
  try {
    const del = await Ticket.findOneAndDelete({ flightcode });
    if (!del) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Ticket deletion failed, No ticket" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Ticket deletion success" });
  } catch (error) {
    return next(
      new ResponseError(
        "Your Request hit a sad server",
        StatusCodes.BAD_REQUEST
      )
    );
  }
}

module.exports = deleteTicket;
