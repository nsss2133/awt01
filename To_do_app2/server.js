const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();

// ----------------------
// Middlewares
// ----------------------
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60
    }
  })
);

// ----------------------
// MongoDB
// ----------------------
mongoose
  .connect("mongodb+srv://nehaS:Todo-123@cluster0.ytilau0.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ----------------------
// Models
// ----------------------
const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  password: String
}));

const Todo = mongoose.model("Todo", new mongoose.Schema({
  text: String,
  userId: mongoose.Schema.Types.ObjectId
}));

// ----------------------
// REGISTER
// ----------------------
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.json({ success: false, message: "Username already taken!" });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });

  res.json({ success: true, message: "Registered successfully!" });
});

// ----------------------
// LOGIN
// ----------------------
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: "Incorrect password" });

  req.session.userId = user._id;
  res.json({ success: true, message: "Login successful" });
});

// ----------------------
// GET TODOS
// ----------------------
app.get("/todos", async (req, res) => {
  if (!req.session.userId) return res.json([]);

  const list = await Todo.find({ userId: req.session.userId });
  res.json(list);
});

// ----------------------
// ADD TODO
// ----------------------
app.post("/todos", async (req, res) => {
  if (!req.session.userId) return res.json({ success: false });

  if (!req.body.text || req.body.text.trim() === "")
    return res.json({ success: false });

  await Todo.create({
    text: req.body.text,
    userId: req.session.userId
  });

  res.json({ success: true });
});

// ----------------------
// UPDATE TODO (PUT)
// ----------------------
app.put("/todos/:id", async (req, res) => {
  if (!req.session.userId) return res.json({ success: false });

  const { id } = req.params;
  const { text } = req.body;

  await Todo.updateOne(
    { _id: id, userId: req.session.userId },
    { $set: { text } }
  );

  res.json({ success: true });
});

// ----------------------
// DELETE TODO
// ----------------------
app.delete("/todos/:id", async (req, res) => {
  if (!req.session.userId) return res.json({ success: false });

  const { id } = req.params;

  await Todo.deleteOne({ _id: id, userId: req.session.userId });

  res.json({ success: true });
});

// ----------------------
app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
