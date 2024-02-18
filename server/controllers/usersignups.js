const User = require("../models/User");

const mongoose = require("mongoose");
const express = require("express");

const getSignup = async (req, res) => {
  try {
    let user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (user) return res.status(400).send("Already registered");

    user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      fullName: req.body.fullName,
      address: req.body.address,
      accountType: req.body.accountType,
      createdAt: new Date(),
    });
    user = await user.save();
    res.status(201).send(user._id);
  } catch (error) {
    res.status(404).json({ message: "Signup Failed" });
  }
};

module.exports = { getSignup };
