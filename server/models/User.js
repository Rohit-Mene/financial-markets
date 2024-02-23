const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//Access custom env variables from server/config/custom-environment-variables.json
const config = require("config");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["individual", "broker", "other"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastLogin: {
    type: Date,
    default: null,
  },
});

UserSchema.methods.generateAuthToken = function(){
  return jwt.sign({ _id: this._id }, config.get("PRIVATE_KEY"));
}
const User = mongoose.model("User", UserSchema);

module.exports = User;
