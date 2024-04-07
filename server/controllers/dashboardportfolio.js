const Portfolio = require("../models/Portfolios");
const mongoose = require("mongoose");
const axios = require("axios");

const mockPortfolioData = {
  userID: "", // Reference to an imaginary User document
  currentValue: 15000, // Current value of this portfolio
  investmentAmount: 10000, // Initial investment amount for this portfolio
  stocks: [
    // Array of stock holdings in this portfolio
    {
      symbol: "AAPL",
      quantity: 10,
      averageBuyPrice: 150,
    },
    {
      symbol: "MSFT",
      quantity: 5,
      averageBuyPrice: 200,
    },
  ],
};

const getDashboardPortfolio = async (req, res) => {
  try {
    const userID = req.query._id;
    mockPortfolioData.userID = userID;
    // const data = new Portfolio(mockPortfolioData);
    // await data.save();

    let user = await Portfolio.findOne({ userID: userID });
    res.status(200).send({
      _id: user.userID,
      currentValue: user.currentValue,
      investmentAmount: user.investmentAmount,
      totalStocks: user.stocks.length,
    });
  } catch (error) {
    console.log("Dashboard portfolio summary failed", error);
  }
};

module.exports = { getDashboardPortfolio };
