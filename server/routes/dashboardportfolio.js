const express = require("express");
const router = express.Router();
const verifyToken = require("../common/verifyuser");
const { getDashboardPortfolio } = require("../controllers/dashboardportfolio.js");

//Uncomment Below to enable authentication
router.use(verifyToken);

router.get("/summary", getDashboardPortfolio);

module.exports = router;