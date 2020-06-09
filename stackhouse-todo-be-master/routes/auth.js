const express = require("express");
const { signup, signin, signout, } = require("../controllers/auth");
// const { userById } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.post("/api/signup", userSignupValidator,signup);
router.post("/api/signin", signin);
router.get("/api/signout", signout);
 



// router.param("userId", userById);

module.exports = router;