const { StatusCodes } = require("http-status-codes");
const getPagination = require("../../utils/getPagination");
const Ticket = require("../../models/Ticket");

async function findAll(req, res, next) {
  const { page, size, category } = req.query;

  try {
    const { limit, offset } = getPagination(page, size);

    const condition = category
      ? { category: { $regex: new RegExp(category), $options: "i" } }
      : {};
    const newTicket = await Ticket.find()
      .populate({
        path: "owner",
        select: "username email",
      })
      .lean();

    const procesedData = newTicket.map((ticket) => {
      const copyticket = { ...ticket };
      const pticket = { ...copyticket, ...ticket.owner };
      delete pticket.owner;

      return pticket;
    });

    console.log(procesedData);
    return res.status(StatusCodes.OK).json(procesedData);
  } catch (error) {
    return res.status(500).json({ msg: error.message, code: 500 });
  }
}
module.exports = findAll;
