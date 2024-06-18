const express = require(`express`);
const Comment = require("../models/Comment");

const commentRouter = express.Router();

commentRouter.get("/", async (req, res, next) => {
  try {
    const comment = await Comment.find();
    res.status(200).send(comment);
  } catch (error) {
    next(error);
  }
});

commentRouter.post("/:issueId", async (req, res, next) => {
  try {
    req.body.user = req.auth._id;
    req.body.issue = req.params.issueId;
    req.body.username = req.auth.username;
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

module.exports = commentRouter;
