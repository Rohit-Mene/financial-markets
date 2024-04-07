const Transaction = require("../models/Transactions");
const mongoose = require("mongoose");
const Portfolio = require("../models/Portfolios");

const postTransaction = async (req, res) => {
  try {
    const { _id, symbol, type } = req.body;
    const numQuantity = Number(req.body.quantity);
    const numPriceAtTransaction = Number(req.body.priceAtTransaction);
    const numTotalValue = Number(req.body.totalValue);
    const currentTransaction = new Transaction({
      userID: _id,
      symbol: symbol,
      type: type,
      quantity: numQuantity,
      priceAtTransaction: numPriceAtTransaction,
      totalValue: numTotalValue,
      transactionDate: Date.now(),
    });
    const savedResponse = currentTransaction.save();
    const userPortfolio = await Portfolio.findOne({ userID: _id });
    if (!userPortfolio) {
      return res.status(404).send("Portfolio not found.");
    }
    let stockIndex = userPortfolio.stocks.findIndex((s) => s.symbol === symbol);
    if (stockIndex !== -1) {
      let stock = userPortfolio.stocks[stockIndex];
      if (type === "buy") {
        const totalQuantity = stock.quantity + numQuantity;
        const totalCost =
          stock.averageBuyPrice * stock.quantity +
          numPriceAtTransaction * numQuantity;
        stock.averageBuyPrice = totalCost / totalQuantity;
        stock.quantity = totalQuantity;
      } else {
        if (stock.quantity < numQuantity) {
          return res.status(400).send("Cannot sell more shares than you own.");
        }
        stock.quantity -= numQuantity;

        if (stock.quantity === 0) {
          userPortfolio.stocks.splice(stockIndex, 1);
        }
      }
    } else if (type === "buy") {
      userPortfolio.stocks.push({
        symbol: symbol,
        quantity: numQuantity,
        averageBuyPrice: numPriceAtTransaction,
      });
    } else {
      return res
        .status(404)
        .send("Cannot sell stock that is not in portfolio.");
    }

    await userPortfolio.save();
    res.status(201).send(savedResponse);
  } catch (error) {
    console.log("Transaction Failed", error);
  }
};

const getTransaction = async (req, res) => {
  try {
    const validUserID = req.query._id;
    const transactions = await Transaction.find({ userID: validUserID });
    res.status(200).send(transactions);
  } catch (error) {
    console.log("Transaction fetch Failed", error);
  }
};

module.exports = { postTransaction, getTransaction };
