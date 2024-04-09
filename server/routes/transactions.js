const express = require("express");
const router = express.Router();
const verifyToken = require("../common/verifyuser");
const {
  postTransaction,
  getTransaction,
  getPortfolio,
  manageFunds,
} = require("../controllers/transactions.js");

//router.use(verifyToken);

router.post("/save", postTransaction);
router.get("/get", getTransaction);
router.get("/getPortfolio", getPortfolio);
router.put("/manageFunds", manageFunds);
module.exports = router;
