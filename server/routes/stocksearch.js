const express = require("express");
const router = express.Router();
const verifyToken = require("../common/verifyuser");
const {
  addWatchList,
  getStocks,
  getTickerSearch,
} = require("../controllers/stocksearch.js");

router.use(verifyToken);
router.get("/add/watchlist", addWatchList);
router.get("/get/stocks/list", getStocks);
router.get("/ticker/search", getTickerSearch);

module.exports = router;
