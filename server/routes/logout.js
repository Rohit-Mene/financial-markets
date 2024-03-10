const express = require("express");
const verifyToken = require("../common/verifyuser");
const router = express.Router();
const { getLogout } = require("../controllers/logout.js");

router.use(verifyToken);
router.get("/logout", getLogout);
module.exports = router;
