const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  username: {
    type: String,
  },
  //   reference to user
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likedUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
  disLikedUser: [{ type: Schema.Types.ObjectId, ref: "User" }],

  PostedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Issues", issueSchema);
