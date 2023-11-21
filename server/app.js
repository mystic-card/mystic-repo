if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const AuthController = require("./controllers/AuthController");
const RoomController = require("./controllers/RoomController");
const CardController = require("./controllers/CardController");
const authentication = require("./middlewares/authentication");
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

// Auth middleware
app.use(authentication);

// User create game room
app.post("/room", RoomController.createRoom);

// Assign 5 random cards to user
app.get("/cards", CardController.randomCards);

module.exports = app;
