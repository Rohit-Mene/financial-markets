const express = require("express");
const router = express.Router();
const verifyToken = require("../common/verifyuser");
const { postTransaction,getTransaction } = require("../controllers/transactions.js");

router.use(verifyToken);

router.post("/save", postTransaction);
router.get("/get", getTransaction);

module.exports = router;
