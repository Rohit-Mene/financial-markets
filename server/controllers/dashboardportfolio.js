const Portfolio = require("../models/Portfolios");
const mongoose = require("mongoose");
const axios = require("axios");
const config = require("config");

const VANTAGE_API_BASE = config.get("VANTAGE_API_BASE");
const API_KEY = config.get("API_KEY");
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
    let currentInvestmentValue = 0;
    if (user.stocks.length > 0 && user.investmentAmount > 0) {
      const stockRequest = user.stocks.map((stock) =>
        axios.get(VANTAGE_API_BASE, {
          params: {
            function: "GLOBAL_QUOTE",
            symbol: stock.symbol,
            apikey: API_KEY,
          },
        })
      );
      const stockList = await Promise.all(stockRequest);
      const responseData = stockList.map((response) =>
        filteredResponse(response.data)
      );

      user.stocks.forEach((userStock) => {
        const responseStock = responseData.find(
          (stock) => stock.symbol === userStock.symbol
        );

        if (responseStock) {
          const currentHoldingValue =
            parseFloat(responseStock.price) * userStock.quantity;

          currentInvestmentValue += currentHoldingValue;
        }
      });
    }
    res.status(200).send({
      _id: user.userID,
      currentValue: currentInvestmentValue,
      investmentAmount: user.investmentAmount,
      totalStocks: user.stocks.length,
    });
  } catch (error) {
    console.log("Dashboard portfolio summary failed", error);
  }
};
function filteredResponse(data) {
  const keysToKeep = ["symbol", "change", "price", "change percent"];
  const keyRenames = {
    "change percent": "percentChange",
  };

  let filteredData = {};
  Object.keys(data["Global Quote"]).forEach((originalKey) => {
    let processedKey = processKey(originalKey);
    if (keysToKeep.includes(processedKey)) {
      processedKey = keyRenames[processedKey] || processedKey;
      filteredData[processedKey] = data["Global Quote"][originalKey];
    }
  });

  return filteredData;
}
function processKey(key) {
  return key.replace(/^\d+\.\s/, "");
}

module.exports = { getDashboardPortfolio };
