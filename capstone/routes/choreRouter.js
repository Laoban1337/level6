const express = require("express");
const choreRouter = express.Router();
const Chore = require("../models/Chore");

//get all chores
choreRouter.get("/", async (req, res, next) => {
  try {
    const chores = await Chore.find();
    res.status(200).send(chores);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

//get  one chore by ID
choreRouter.get("/:choreId", async (req, res, next) => {
  try {
    const choreId = req.params.choreId;
    const chore = await Chore.findById(choreId);
    if (!chore) {
      return res.status(404).send({ errMsg: "No chore found by that Id" });
    }
    res.status(200).send(chore);
  } catch (error) {
    next(error);
  }
});

//post a chore
choreRouter.post("/", async (req, res, next) => {
  try {
    //deconstructing values from choreObject in the req.body
    const { choreName, choreTime, choreImg, username } = req.body;
    //create new instance of Chore with the above values
    const newChore = new Chore({
      choreName,
      choreTime,
      choreImg,
      username,
    });

    //save new chore
    const savedChore = await newChore.save();
    // sending back status of 200(sucessfull)
    res.status(200).send(savedChore);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

//update a chore
choreRouter.put("/:choreId", async (req, res, next) => {
  try {
    const updatedChore = await Chore.findOneAndUpdate(
      { _id: req.params.choreId },
      req.body,
      { new: true }
    );
    res.status(201).send(updatedChore);
  } catch (error) {
    return next(error);
  }
});

//delete a chore
choreRouter.delete("/:choreId", async (req, res, next) => {
  const choreId = req.params.choreId;
  try {
    const deletedChore = await Chore.findOneAndDelete({
      _id: choreId,
      user: req.auth._id,
    });
    res.status(200).send(`successfully deleted ${deletedChore.choreName}`);
  } catch (error) {
    res
      .status(500)
      .send(new Error("There was a problem deleting the selected chore"));
  }
});

module.exports = choreRouter;
