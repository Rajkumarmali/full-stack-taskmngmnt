const express = require("express");
const router = express.Router();
const Users = require("../models/Users"); // Assuming you have a Mongoose model defined for Users
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    }).then(() => {
      res.json("SUCCESS");
    }).catch((error) => {
      res.status(500).json({ error: "Error creating user." });
    });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ username: username });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const basicInfo = await Users.findById(id).select("-password");
    res.json(basicInfo);
  } catch (error) {
    res.status(404).json({ error: "User not found." });
  }
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ username: req.user.username });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then(() => {
      Users.findByIdAndUpdate(user._id, { password: hash })
        .then(() => {
          res.json("SUCCESS");
        })
        .catch((error) => {
          res.status(500).json({ error: "Error updating password." });
        });
    });
  });
});

module.exports = router;
