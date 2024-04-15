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
    let userPortfolio = await Portfolio.findOne({ userID: _id });
    if (!userPortfolio) {
      return res.status(404).send("Portfolio not found.");
    }
    let stockIndex = userPortfolio.stocks.findIndex((s) => s.symbol === symbol);
    if (type === "buy" && numTotalValue > userPortfolio.fundsAmount) {
      return res.status(400).send({ message: `Not enough funds. Funds Available: $${userPortfolio.fundsAmount.toFixed(2)}` });
    }
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
          return res.status(400).send({message:"Cannot sell more shares than you own."});
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
        .send({message:"Cannot sell stock that is not in portfolio."});
    }
    if (type === "buy") {
      userPortfolio.investmentAmount += numTotalValue;
      userPortfolio.fundsAmount -= numTotalValue;
    } else {
      userPortfolio.fundsAmount += numTotalValue;
      userPortfolio.investmentAmount += numTotalValue;
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

const getPortfolio = async (req, res) => {
  try {
    const validUserID = req.query._id;
    const portfolioData = await Portfolio.findOne({ userID: validUserID });
    const stocks = portfolioData.stocks;
    res.status(200).send(stocks);
  } catch (error) {
    console.log("Transaction fetch Failed", error);
  }
};
const manageFunds = async (req, res) => {
  try {
    const userId = req.query._id;
    const fundsChange =
      req.body.type === "add" ? req.body.funds : -req.body.funds;

    const portfolio = await Portfolio.findOne({ userID: userId });

    if (!portfolio) {
      return res.status(404).send("User portfolio not found.");
    }

    if (fundsChange < 0 && portfolio.fundsAmount + fundsChange < 0) {
      return res
        .status(400)
        .send("Insufficient funds to complete this operation.");
    }

    const updatedDocument = await Portfolio.findOneAndUpdate(
      { userID: userId },
      { $inc: { fundsAmount: fundsChange } },
      { new: true }
    );

    if (updatedDocument) {
      console.log(updatedDocument);
      res.status(200).send("Funds updated successfully.");
    } else {
      res.status(404).send("Failed to update funds.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while managing funds.");
  }
};

const getFundDetails = async (req, res) => {
  try {
    const validUserID = req.query._id;
    const portfolioData = await Portfolio.findOne({ userID: validUserID });
    const resData = {
      userID: portfolioData.userID,
      currentValue: portfolioData.currentValue,
      investmentAmount: portfolioData.investmentAmount,
      fundsAmount: portfolioData.fundsAmount,
    };
    res.status(200).send(resData);
  } catch (error) {
    console.log("Transaction fetch Failed", error);
  }
};

module.exports = {
  postTransaction,
  getTransaction,
  getPortfolio,
  manageFunds,
  getFundDetails,
};
