const users = require("../models/userSchema");
const admin = require("../models/adminSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = "abcdefghijklmnop";
const { json } = require("body-parser");
const { ObjectId } = require("mongoose");

exports.userregister = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please Enter All Input Data" });
    }
    const preuser = await admin.findOne({ email: email });

    if (preuser) {
      return res
        .status(400)
        .json({ error: "This user already exists in our database" });
    } else {
      const userregister = new admin({
        email,
        password,
      });

      // Here password hashing

      const storeData = await userregister.save();
      if (storeData) {
        return res.status(200).json(storeData);
      }
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please Enter Your Email and Password" });
  }

  try {
    const preuser = await admin.findOne({ email: email });

    if (preuser) {
      const passwordMatch = await bcrypt.compare(password, preuser.password);
      if (passwordMatch) {
        const token = await preuser.generateAuthtoken();
        return res
          .status(200)
          .json({ message: "User Login Succesfully Done", userToken: token });
      } else {
        return res.status(400).json({ error: "Please Enter Valid Password" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "This User Not Exist In our Database" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.CreateUser = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      email,
      MobileNumber,
      Address1,
      Address2,
      State,
      City,
      Country,
      ZipCode,
    } = req.body;

    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "This user already exists in our database" });
    }

    const userregister = new users({
      FirstName: FirstName,
      LastName: LastName,
      email: email,
      MobileNumber: MobileNumber,
      Address1: Address1,
      Address2: Address2,
      State: State?.name ?? "",
      City: City?.name ?? "",
      Country: Country?.name ?? "",
      ZipCode: ZipCode,
    });

    const storeData = await userregister.save();
    console.log(storeData);

    return res
      .status(200)
      .json({ message: "User created successfully", user: storeData });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.DeleteUsers = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedDocument = await users.findByIdAndDelete(id);
    if (deletedDocument) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getallUser = async (req, res) => {
  try {
    let data = await users.find();
    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.GetUsers = async (req, res) => {
  const { id } = req.body;
  try {
    let data = await users.findById(id);

    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.EditUser = async (req, res) => {
  const {
    FirstName,
    LastName,
    email,
    MobileNumber,
    Address1,
    Address2,
    State,
    City,
    Country,
    ZipCode,
    id,
  } = req.body;
  try {
    const userEdit = await users.findByIdAndUpdate(
      id,
      {
        FirstName,
        LastName,
        email,
        MobileNumber,
        Address1,
        Address2,
        State: State?.name ?? "",
        City: City?.name ?? "",
        Country: Country?.name ?? "",
        ZipCode,
      },
      { new: true }
    );
    if (userEdit) {
      return res.status(200).send(userEdit);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
  }
};