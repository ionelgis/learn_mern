const express = require("express");
const mongoose = require("mongoose");

//routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//db config
const db = require("./config/keys").mongoURI;

//conect to mongo db through mongoose
mongoose
  .connect(db)
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("good going1");
});

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("app running on port " + port);
});
