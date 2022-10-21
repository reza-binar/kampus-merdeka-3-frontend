const express = require("express");
const cors = require("cors");
const validator = require("validator");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY = "Rahasia", NODE_ENV } = process.env;
const { User } = require("./models");

const PORT = process.env.PORT || "8000";
const app = express();

app.use(cors());
app.use(express.json());

function createToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
}

app.post("/api/v1/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    const isStrongPassword = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    });

    if (!isStrongPassword) {
      return res.status(400).json({ message: "Password must be stronger" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      encryptedPassword,
      registeredVia: "web",
    });

    const token = createToken(user);

    res.status(201).json({ token });
  } catch (error) {
    if (error.message === "Validation error") {
      return res.status(400).json({ message: "User has already registered" });
    }

    if (NODE_ENV === "production") {
      error.message = "Internal Server Error";
    }

    res.status(500).json({ message: error.message });
  }
});

app.post("/api/v1/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "User is not found" });
    }

    const comparison = await bcrypt.compare(password, user.encryptedPassword);
    if (!comparison) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = createToken(user);

    res.status(200).json({ token });
  } catch (error) {
    if (NODE_ENV === "production") {
      error.message = "Internal Server Error";
    }

    res.status(500).json({ message: error.message });
  }
});

app.get("/api/v1/auth/me", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    const token = req.headers.authorization.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    const verify = jwt.verify(token, "Rahasia");

    const user = JSON.parse(
      JSON.stringify(await User.findOne({ where: { id: verify.id } }))
    );
    if (!user) {
      return res.status(401).json({ message: "User is not found" });
    }

    delete user.encryptedPassword;

    return res.status(200).json(user);
  } catch (error) {
    if (NODE_ENV === "production") {
      error.message = "Your token is not valid";
    }

    return res.status(401).json({ message: error.message });
  }
});

app.post("/api/v1/auth/google", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ message: "Access Token is required" });
    }

    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    const { sub, email, name } = response.data;

    let user = await User.findOne({ where: { googleId: sub } });
    if (!user)
      user = await User.create({
        email,
        name,
        googleId: sub,
        registeredVia: "google",
      });

    const token = createToken(user);

    res.status(201).json({ token });
  } catch (error) {
    if (NODE_ENV === "production") {
      error.message = "Your token is not valid";
    }

    res.status(401).json({ message: error.message });
  }
});

app.get("/api/docs", (req, res, next) => {
  try {
    res.redirect("https://documenter.getpostman.com/view/3884681/2s847ESZqT");
  } catch (error) {
    if (NODE_ENV === "production") {
      error.message = "internal server error";
    }

    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
