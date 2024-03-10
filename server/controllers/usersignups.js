const User = require("../models/User");
const bcrypt = require("bcrypt");

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
      //accountType: req.body.accountType,
      accountType: "individual",
      createdAt: new Date(),
    });
    user = await user.save();

    res.status(201).send({ _id: user._id, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Signup Failed" });
  }
};

const getLogin = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(401).send("Invalid User");

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(checkPassword);
    if (!checkPassword)
      return res.status(401).send("Username or Password is wrong");
    const token = user.generateAuthToken();
    res
      .cookie("auth-token", token, { httpOnly: true, })
      .status(200)
      .send({ _id: user._id, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Signup Failed" });
  }
};


module.exports = { getSignup, getLogin };
