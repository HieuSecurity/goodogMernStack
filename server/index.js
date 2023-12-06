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
app.post("/post/data", async (req, res) => {
  try {
    // Lấy thông tin người dùng từ request body
    const { username, email, password } = req.body;
    // Tạo một đối tượng User
    const newUser = await new User({ username, email, password });
    // Lưu đối tượng vào cơ sở dữ liệu
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "Người dùng đã được tạo thành công", user: savedUser });
    console.log(`tao user thanh cong`);
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error);
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
});
app.delete("/api/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await User.findByIdAndDelete(id);
    if (deletedItem) {
      res.status(200).send("Successfully deleted");
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/api/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateItem = await User.findByIdAndUpdate(id, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    if (updateItem) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/", (req, res) => {
  res.send(`Server is running `);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
