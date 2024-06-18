const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const choreSchema = new Schema({
  choreName: {
    type: String,
    required: true,
  },
  choreTime: {
    type: Number,
    required: true,
  },
  choreImg: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  likedUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
  disLikedUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Chore", choreSchema);
