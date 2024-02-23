const express = require("express");
const router = express.Router();
const { getInitStocks } = require("../controllers/stockdetails.js");

router.get("/init", getInitStocks);
module.exports = router;
