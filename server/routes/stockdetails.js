const express = require("express");
const router = express.Router();
const verifyToken = require("../common/verifyuser");
const { getInitStocks } = require("../controllers/stockdetails.js");
router.use(verifyToken);

router.get("/init", getInitStocks);
module.exports = router;
