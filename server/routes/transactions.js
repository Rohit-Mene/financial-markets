const express = require("express");
const router = express.Router();
const { postTransaction } = require("../controllers/transactions.js");

router.post("/save", postTransaction);

module.exports = router;
