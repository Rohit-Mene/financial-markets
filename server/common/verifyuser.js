const jwt = require("jsonwebtoken");
const config = require("config");
const verifyToken = (req, res, next) => {
  const token = req.cookies["auth-token"];
  if (!token) return res.status(403).send({ isLoggedIn: false });
  try {
    const decoded = jwt.verify(token, config.get("PRIVATE_KEY"));
    req.id = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
