const express = require("express");
const helmet = require("helmet");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const usersignups = require("./routes/usersignups");
const stockdetails = require("./routes/stockdetails");
const dashboardportfolio = require("./routes/dashboardportfolio");
const verifyToken = require("./routes/verifyauth");
const userlogout = require("./routes/logout");
const cookieParser = require("cookie-parser");
/**
 * MONGOOSE DATABASE CONNECTION
 */

const PORT = process.env.PORT || 5001;

mongoose
  .connect("mongodb://localhost/financialmarkets")
  .then(() => {
    console.log("Connected to MongoDB");
    /**
     * SERVER PORT
     */

    app.listen(PORT, () => console.log(`Server Port:${PORT}`));
  })
  .catch((err) => console.error("Failed to connect to MongoDB"));

/**
 * MIDDLEWARE SETUP
 */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
/**
 * ROUTES
 */

app.use("/api", usersignups);
app.use("/api/stocks", stockdetails);
app.use("/api/dashboard", dashboardportfolio);
//Still working on the below
app.use("/api/auth",verifyToken)
app.use("/api", userlogout);
