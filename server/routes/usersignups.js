const express = require("express");
const router = express.Router();
const { getSignup } = require("../controllers/usersignups.js");

router.post("/signup", getSignup);
//router.get("/login", getLogin);
module.exports = router;
