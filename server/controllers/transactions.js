const Transaction = require("../models/Transactions");
const mongoose = require("mongoose");
const postTransaction = async (req, res) => {
  try {
    console.log(req.body.totalValue);
    const currentTransaction = new Transaction({
      userID: req.body._id,
      symbol: req.body.symbol,
      type: req.body.type,
      quantity: Number(req.body.quantity),
      priceAtTransaction: Number(req.body.priceAtTransaction),
      totalValue: Number(req.body.totalValue),
      transactionDate: Date.now(),
    });
    const savedResponse = currentTransaction.save();
    res.send(savedResponse);
  } catch (error) {
    console.log("Transaction Failed", error);
  }
};

module.exports = { postTransaction };
