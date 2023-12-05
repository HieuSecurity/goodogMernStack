const express = require("express");
const app = express();
const PORT = 3000;
const User = require("./UserModel");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://goodog:123@cluster0.jpcxsij.mongodb.net/data_app?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`connect success`);
  })
  .catch(() => {
    console.log(`failed to connects to Mongooses`);
  });

app.get("/api/data", async (req, res) => {
  const data = await User.find({});
  res.status(200).json(data);
});
app.get("/", (req, res) => {
  res.send(`Server is running `);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
