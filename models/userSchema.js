const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "abcdefghijklmnop";

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  MobileNumber: {
    type: String,
    require: true,
  },

  Address1: {
    type: String,
    require: true,
  },
  Address2: {
    type: String,
    require: true,
  },
  State: {
    type: String,
  },
  City: {
    type: String,
  },
  Country: {
    type: String,
  },
  ZipCode: {
    type: Number,
    require: true,
  },
});

//create model
const users = new mongoose.model("users", userSchema);
module.exports = users;
