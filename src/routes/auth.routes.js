const router = require("express").Router();
const { postLogin, postRegister } = require("../controller/auth.controller");

router.route("/register").post(postRegister);
router.route("/login").post(postLogin);

module.exports = router;
