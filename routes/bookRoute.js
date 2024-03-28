const cancelTicket = require("../controllers/ticket/Cancel");
const createTicket = require("../controllers/ticket/Create");
const deleteTicket = require("../controllers/ticket/Delete");
const update = require("../controllers/ticket/Update");
const findAll = require("../controllers/ticket/findAll");
const isAdmin = require("../middlewares/validation/isAdmin");
const verifyToken = require("../middlewares/validation/verifyToken");

const router = require("express").Router();

router.route("/book").post(verifyToken, createTicket);
router.route("/delete").delete([verifyToken], deleteTicket);
router.route("/table").get([verifyToken, isAdmin], findAll);
router.route("/cancel").patch([verifyToken], cancelTicket);

module.exports = router;
