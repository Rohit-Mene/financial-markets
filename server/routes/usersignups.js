const express = require("express");
const router = express.Router();
const { getSignup,getLogin } = require("../controllers/usersignups.js");

router.post("/signup", getSignup);
router.post("/login", getLogin);

module.exports = router;
