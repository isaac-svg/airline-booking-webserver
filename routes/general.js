const router = require("express").Router();
const findAll = require("../controllers/ticket/findAll");

router.route("/all").get(findAll);

module.exports = router;
