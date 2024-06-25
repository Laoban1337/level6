const express = require("express");
const choreRouter = express.Router();
const Chore = require("../models/Chore");
const User = require("../models/User");

choreRouter.use(express.json());
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
// choreRouter.get("/:choreId", async (req, res, next) => {
//   try {
//     const choreId = req.params.choreId;
//     const chore = await Chore.findById(choreId);
//     if (!chore) {
//       return res.status(404).send({ errMsg: "No chore found by that Id" });
//     }
//     res.status(200).send(chore);
//   } catch (error) {
//     next(error);
//   }
// });

//get chore by userId
// choreRouter.get("/user/:userId"),
//   async (req, res, next) => {
//     try {
//       const userId = req.params.userId;
//       const chores = await Chore.find({ user: userId });
//       if (!chores.length) {
//         return res.status(404).send({ errMsg: "No Chores found on that user" });
//       }
//       res.status(200).send(chores);
//     } catch (error) {
//       next(error);
//     }
//   };

//post a chore
choreRouter.post("/", async (req, res, next) => {
  try {
    //deconstructing values from choreObject in the req.body
    // const { choreName, choreTime, choreImg, username } = req.body;
    req.body.user = req.auth._id
    req.body.userName = req.auth.username
    console.log(req.auth)
    //create new instance of Chore with the above values
    const newChore = new Chore(req.body);

    //save new chore
    const savedChore = await newChore.save();
    // sending back status of 200(sucessfull)
    res.status(200).send(savedChore);
  } catch (error) {
    res.status(500);
    console.log(req.auth)
    next(error);
  }
});


// GET route to fetch all chores for a specific user
choreRouter.get("/user", async (req, res, next) => {
  try {
    
    // Find the user by username
 

    // Find all chores associated with the user
    const chores = await Chore.find({ user: req.auth._id });

    res.status(200).send(chores)
  } catch (error) {
    next(error); // Pass the error to the Express error handler
  }
});

//post new chore  to a specific user {Admin future use}
// choreRouter.post("/user/:username", async (req, res, next) => {
//   try {
//     const { choreName, choreTime, choreImg } = req.body;
//     const username = req.params.username;

//     // Find the user by username
//     let user = await User.findOne({ username });

//     // If user does not exist, create a new user
//     if (!user) {
//       user = new User({ username });
//       await user.save();
//     }

//     // Create a new chore instance
//     const newChore = new Chore({
//       choreName,
//       choreTime,
//       choreImg,
//       user: user._id, // Assign the ObjectId of the user
//     });

//     // Save the chore to the database
//     const savedChore = await newChore.save();

//     res.status(201).json(savedChore);
//   } catch (error) {
//     next(error); // Pass the error to the Express error handler
//   }
// });

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
