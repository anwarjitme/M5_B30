const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/authModel");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const {email, password } = req.body;
  try {
 const hash_password = await bcrypt.hash(password, 5);
    const register_user = new UserModel({
      email: email,
      password: hash_password,
    });
    await register_user.save();
    res.status(201).json({"message":"signup successful"});
  } catch (err) {
    res.status(500).json({"merssage":"something wrong in API"});
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await UserModel.findOne({ email });
    if (!newUser) {
      return res.status(401).json({"message":"something went wrong !"});
    }

    const decode_password = await bcrypt.compare(password, newUser.password);
    if (!decode_password) {
      return res.status(401);
    }
    const token = jwt.sign({ userId: newUser._id }, "doctor");
    res.send({ token: `${token}` });
  } catch (err) {
  res.json({"error":"Something wrong in login"})
  }
});

module.exports = {
  userRouter,
};

