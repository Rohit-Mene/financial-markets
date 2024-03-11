const Portfolio = require("../models/Portfolios");

const getVerifiedUser = async (req, res) => {
  try {
    res.status(200).send({
      isLoggedIn: true,
    });
  } catch (error) {
    console.log("Dashboard portfolio summary failed", error);
  }
};

module.exports = { getVerifiedUser };
