const express = require("express");
const { getUsers, createUser } = require("../controller/userController");

const userRoute = express.Router();

userRoute.get("/getUsers", getUsers);
userRoute.post("/createUser", createUser);

module.exports = userRoute;