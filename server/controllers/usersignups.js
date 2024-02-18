const User = require("../models/User");
const bcrypt = require("bcrypt");

//Access custom env variables from server/config/custom-environment-variables.json
const config = require("config");
/**
 * https://jwt.io/libraries?language=Node.js
 */
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");

const getSignup = async (req, res) => {
  try {
    let user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (user) return res.status(400).send("Already registered");

    /**
     * Hash Password
     */
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      fullName: req.body.fullName,
      address: req.body.address,
      accountType: req.body.accountType,
      createdAt: new Date(),
    });
    user = await user.save();
    //let userDetRes = _.pick(user, ["_id", "username"]);
    //console.log(process.env.PRIVATE_KEY);
    const token = jwt.sign({ _id: user._id }, config.get("PRIVATE_KEY"));
    res.status(201).send({ _id: user._id, username: user.username, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Signup Failed" });
  }
};

module.exports = { getSignup };
