const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//sign up route
authRouter.post(`/signup`, async (req, res, next) => {
  const { username, password } = req.body; // Extract username and password from request body
  try {
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });
    if (existingUser) {
      res.status(403);
      return next(new Error("That username is already taken"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET);

    return res.status(201).send({ token, user: savedUser.withoutPassword() });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

//login route
authRouter.post(`/login`, async (req, res, next) => {
  try {
    const { username, password } = req.body; // Extract username and password from request body
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      res.status(403);
      return next(
        new Error(
          "Username/password issue. Please check username and/or password!"
        )
      );
    }
    console.log("Stored hashed password:", user.password);
    console.log("Provided password:", password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(403);
      return next(
        new Error("Username/password issue. Please check your credentials")
      );
    }

    //   const token = jwt.sign({ id: user._id }, process.env.SECRET);
    const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
    return res.status(200).send({ token, user: user.withoutPassword() });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = authRouter;


