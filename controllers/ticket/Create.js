const { StatusCodes } = require("http-status-codes");
const Ticket = require("../../models/Ticket");
const uploadImage = require("../../utils/uploadToCloud");
const User = require("../../models/User");
// code: "code:""";
async function createTicket(req, res, next) {
  try {
    console.log(req.body);

    const user = User.findOne({
      firstName: req.body?.userData?.firstname,
      email: req.body?.userData?.email,
      code: req.body?.userData?.code,
    });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Make sure You have the rights to use this service",
        code: StatusCodes.BAD_REQUEST,
      });
    }
    const terminals = ["1", "2", "3", "4"];
    const gates = ["#22", "#1", "#2", "#9"];
    const ticket = new Ticket({
      ...req.body,
      owner: req.body.userData.id,
      terminal: terminals[Math.floor(Math.random() * terminals.length)],
      gate: gates[Math.floor(Math.random() * gates.length)],
    });
    const ticketpayload = await ticket.save();
    return res.status(StatusCodes.CREATED).json({
      msg: "Ticket Creation successfull",
      code: StatusCodes.CREATED,
      payload: ticketpayload,
      username: user.username,
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: error.message, code: StatusCodes.BAD_REQUEST });
  }
}

module.exports = createTicket;
