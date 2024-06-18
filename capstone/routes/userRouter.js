const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
//get a user
userRouter.get("/", async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

userRouter.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("No user found with that id!");
    }

    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
});
//add ability for admin to update/post and delete  user :ToDo

// userRouter.post("/", async (req, res, next) => {
//   try {
//     const { username,password } = req.body;
//     const newUser= new User({
//       username,
//       password
//     });
//     const savedUser = await newUser.save()
//     // sending back status of 200(sucessfull)
//     res.status(200).send(savedUser)
//   } catch (error) {
//     res.status(500)
//     return next(error)
//   }
// });

userRouter.delete("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findOneAndDelete({
      _id: userId,
      user: req.auth._id,
    });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(`successfully deleted ${deletedUser.userName}`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "There was a problem deleting the selected user" });
  }
});

module.exports = userRouter;
