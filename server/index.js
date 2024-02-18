const express = require("express");
const helmet = require("helmet");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const usersignups = require("./routes/usersignups");
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
app.use(cors());

/**
 * ROUTES
 */

app.use("/api", usersignups);
