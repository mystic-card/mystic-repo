if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const AuthController = require("./controllers/AuthController");
const cors = require("cors");

const app = express();

app.use(cors());

// Middleware for body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User login using email & password
app.post("/login", AuthController.login);

// User register using email & password
app.post("/register", AuthController.register);

module.exports = app;
