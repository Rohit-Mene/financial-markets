const express = require("express");
const router = express.Router();
const { postTransaction } = require("../controllers/transactions.js");

router.post("/transaction", postTransaction);

module.exports = router;
