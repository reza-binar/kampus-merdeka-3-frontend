const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/auth/register", (req, res) => {
  const token = jwt.sign({ id: 1, username: req.body.username }, "Rahasia");
  res.status(201).json({ token });
});

app.post("/api/v1/auth/login", (req, res) => {
  if (req.body.username !== "username") {
    return res.status(401).json({ message: "Username Salah!" });
  }
  if (req.body.password !== "123456") {
    return res.status(401).json({ message: "Password Salah!" });
  }

  const token = jwt.sign({ id: 1, username: req.body.username }, "Rahasia");
  res.status(201).json({ token });
});

app.get("/api/v1/auth/me", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Anda belum login" });
  }

  const token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Anda belum login" });
  }

  try {
    const verify = jwt.verify(token, "Rahasia");
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  return res.status(200).json({ id: 1, username: "username" });
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
