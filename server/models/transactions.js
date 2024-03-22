const mongoose = require("mongoose");
const Schema = mongoose.Schema;      
const TransactionsSchema = mongoose.Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  symbol: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  priceAtTransaction: {
    type: Number,
    required: true,
  },
  totalValue: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: null,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
});

const Transactions = mongoose.model("Transaction", TransactionsSchema);

module.exports = Transactions;
