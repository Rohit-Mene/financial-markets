const jwt = require("jsonwebtoken");
const config = require("config");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) res.status(403).send("No Token");
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.get("PRIVATE_KEY"));
    req.id = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
