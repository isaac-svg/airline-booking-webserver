const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");
const Ticket = require("../../models/Ticket");

async function cancelTicket(req, res, next) {
  const {
    flightcode,

    departureDate,
    departureTime,
    owner,
  } = req.body;
  console.log(req.body, "request body");
  try {
    const newTicket = await Ticket.findOneAndUpdate(
      {
        flightcode,
      },
      { isValid: false },
      { new: true }
    );
    if (!newTicket) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Ticket Cacncelation  failed, No ticket",
      });
    }
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Ticket Cancelation success" });
  } catch (error) {
    return next(
      new ResponseError(
        "Your Request hit a sad server",
        StatusCodes.BAD_REQUEST
      )
    );
  }
}

module.exports = cancelTicket;
