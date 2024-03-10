const express = require("express");
const router = express.Router();
const verifyToken = require("../common/verifyuser");
const { getVerifiedUser } = require("../controllers/verifyauth.js");
router.use(verifyToken);
router.get("/user", getVerifiedUser);

module.exports = router;
