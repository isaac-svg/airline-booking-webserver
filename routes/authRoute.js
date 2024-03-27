const { login } = require("../controllers/auth/Login")
const profile = require("../controllers/auth/Profile")
const { register } = require("../controllers/auth/Register")
const verifyToken = require("../middlewares/validation/verifyToken")

const router =  require("express").Router()






router.route("/register").post(register)
router.route("/login").post(login)
router.route("/profile").get(verifyToken,profile)



module.exports = router