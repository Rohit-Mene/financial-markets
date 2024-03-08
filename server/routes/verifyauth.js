const express = require("express");
const router = express.Router();
const verifyToken = require("../common/verifyuser");

router.use(verifyToken);
router.get("/user", () =>  async(req, res) => {
  return res.status(200).send("Hello");
});

module.exports = router;
