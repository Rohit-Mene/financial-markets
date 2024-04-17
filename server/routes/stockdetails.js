const express = require("express");
const router = express.Router();
//const verifyToken = require("../common/verifyuser");
const { getInitStocks,getRequestedStock,getTickerSearch } = require("../controllers/stockdetails.js");
const { getChartData } = require("../controllers/chartdetails.js");
//Uncomment Below to enable authentication
//router.use(verifyToken);

router.get("/init", getInitStocks);
router.get("/chart", getChartData);
router.get("/reqstock", getRequestedStock);
router.get("/ticker/search",getTickerSearch);
module.exports = router;
