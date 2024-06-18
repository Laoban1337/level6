const express = require("express");
const issuesRouter = express.Router();
const Issue = require("../models/Issue");

issuesRouter.use(express.json());

// Get All Issues
issuesRouter.get("/", async (req, res, next) => {
  try {
    const issues = await Issue.find();
    res.status(200).send(issues);
  } catch (error) {
    next(error);
  }
});

// Get issues by user id
issuesRouter.get("/user", async (req, res, next) => {
  try {
    const issues = await Issue.find({ user: req.auth._id });
    res.status(200).send(issues);
  } catch (error) {
    next(error);
  }
});

// Add new Issue
issuesRouter.post("/", async (req, res, next) => {
  try {
    req.body.user = req.auth._id;
    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    res.status(201).send(savedIssue);
  } catch (error) {
    next(error);
  }
});

// Delete Issue
issuesRouter.delete("/:issueId", async (req, res, next) => {
  try {
    const deletedIssue = await Issue.findOneAndDelete({
      _id: req.params.issueId,
      user: req.auth._id,
    });
    res.status(200).send(`Successfully deleted issue: ${deletedIssue.title}`);
  } catch (error) {
    next(error);
  }
});

// Update Issue
issuesRouter.put("/:issueId", async (req, res, next) => {
  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      req.body,
      { new: true }
    );
    console.log(updatedIssue);
    res.status(201).send(updatedIssue);
  } catch (error) {
    next(error);
  }
});
// Vote on issues
//upVote

issuesRouter.put("/upVote/:issueId", async (req, res, next) => {
  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      {
        $addToSet: { likedUsers: req.auth._id }, // Added comma here
        $pull: { dislikedUsers: req.auth._id }, // Added comma here
      },
      { new: true }
    );

    if (!updatedIssue) {
      res.status(404);
      return next(new Error("Issue not found"));
    }

    res.status(201).send(updatedIssue);
  } catch (err) {
    res.status(500);
    next(err);
  }
});

issuesRouter.put("/downVote/:issueId", async (req, res, next) => {
  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      {
        $addToSet: { dislikedUsers: req.auth._id },
        $pull: { likedUsers: req.auth._id },
      },
      { new: true }
    );
    res.status(201).send(updatedIssue);
  } catch (err) {
    res.status(500);
    next(err);
  }
});

// issuesRouter.put("/upVote/:issueId", async (req, res, next) => {
//   console.log(req.auth._id)
//   try {

//     const issueId = req.params.issueId;
//     const userId = req.auth._id;

//     const issue = await Issue.findById(issueId);

//     if (!issue){
//       res.status(404);
//       return next (new Error('Issue not found'));
//     }

//     if (!issue.likedUser.includes(userId)) {
//       issue.likedUser.push(userId)
//     }

//     const updatedIssue = await issue.save();

//     // remove
//     issue.disLikedUser = issue.disLikedUser.filter(user => !user.equals(userId));

//     res.status(201).send(updatedIssue);
//   } catch (err) {
//     res.status(500);
//     next(err);
//   }
// });

// issuesRouter.put("/downVote/:issueId", async (req, res, next) => {
//   try {
//     const issueId = req.params.issueId;
//     const userId = req.auth._id;

//     const issue = await Issue.findById(issueId);
//     // Error
//     if (!issue){
//       res.status(404);
//       return next (new Error('Issue not found'));
//     }
//     // Add to array
//     if (!issue.disLikedUser.includes(userId)) {
//       issue.disLikedUser.push(userId)
//     }
//     // Save
//     const updatedIssue = await issue.save();

//     // Remove from array
//     issue.likedUser = issue.likedUser.filter(user => !user.equals(userId));

//     res.status(201).send(updatedIssue);
//   } catch (err) {
//     res.status(500);
//     next(err);
//   }
// });

//downVote

module.exports = issuesRouter;
