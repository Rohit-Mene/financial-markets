const mongoose = require("mongoose");

const InstrumentsSchema = mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
    unique: true,
  },
  change: {
    type: String,
    required: true,
  },
  changePercent: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Instruments = mongoose.model("Instrument", InstrumentsSchema);

module.exports = Instruments;
