const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  averageBuyPrice: { type: Number, required: true },
});

// Define the Portfolio schema
const PortfolioSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  currentValue: { type: Number, required: true },
  investmentAmount: { type: Number, required: true },
  stocks: [StockSchema],
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
