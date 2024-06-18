const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  memeberSince: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//presave hook for encrypting password


//method to check encrypted password for login
userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  } catch (error) {
    throw error;
  }
});
//checking hashed password
userSchema.methods.checkPassword = async function (passwordAttempt) {
  try {
    const isMatch = await bcrypt.compare(passwordAttempt, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

//method to remove password/hashedPassword from front end
userSchema.methods.withoutPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);


/**userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  } catch (error) {
    throw error;
  }
});
// ASYNC MONGOOOSE 8 -------------------------------------------
userSchema.methods.checkPassword = async function (passwordAttempt) {
  try {
    const isMatch = await bcrypt.compare(passwordAttempt, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};
//method to remove users password for token/sending the response
userSchema.methods.withoutPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
}; */
