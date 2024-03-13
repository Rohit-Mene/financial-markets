const express = require("express");
const router = express.Router();
//const verifyToken = require("../common/verifyuser");
const { getInitStocks } = require("../controllers/stockdetails.js");
const { getChartData } = require("../controllers/chartdetails.js");
//Uncomment Below to enable authentication
//router.use(verifyToken);

router.get("/init", getInitStocks);
router.get("/chart", getChartData);
module.exports = router;
