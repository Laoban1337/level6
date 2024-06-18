const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const { expressjwt } = require("express-jwt");
const port = process.env.PORT;
const dataBaseConnect = process.env.DB;

//middleware
app.use(express.json());
app.use(morgan("dev"));

// Database connection
mongoose.connect(dataBaseConnect, {

  });
//connection event logs
  const db = mongoose.connection;
  db.on('error', (err) => {
    console.error(`Failed to connect to the database: ${err}`);
  });
  db.once('open', () => {
    console.log(' You are now connected to the database');
  });
  

//routes
//signup and login
app.use("/auth", require("./routes/authRouter.js"));

//protected routes
app.use("/api/main",expressjwt({secret:process.env.SECRET,algorithms:["HS256"]}))
app.use("/api/main/chore",require("./routes/choreRouter.js"))
app.use("/api/main/user",require("./routes/userRouter.js"))

//err handling
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send({ errMsg: err.message });
});

//server listening
app.listen(port, () => {
  console.log(`You are now connected to the server on port ${port}`);
});
