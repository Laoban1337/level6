const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const {expressjwt} = require("express-jwt");
require("dotenv").config();

const app = express();
const port = process.env.PORT||7000;
const DB = process.env.DB;

app.use(express.json());
app.use(morgan(`dev`));

mongoose
  .connect(DB)
  .then(() => console.log("You are now connected to the DataBase"))
  .catch((err) => console.log("DataBase connection error : ", err));
//sign up and login routes
app.use("/auth", require("./routes/auth.js"));
//middlware for JWT authentication
//protected routes
app.use(
  "/api/main",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
); // req.user

app.use("/api/main/issue", require("./routes/issues.js"));
app.use("/api/main/comments", require("./routes/commentRouter.js"));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.listen(port, () => {
  console.log(`Listening to server on port ${port}`);
});
