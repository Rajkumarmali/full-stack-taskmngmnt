const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts"); // Assuming you have a Mongoose model defined for Posts

router.get("/", async (req, res) => {
  try {
    const listOfPosts = await Posts.find();
    res.json(listOfPosts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts." });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Posts.findById(id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: "Post not found." });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;

  // post.username = req.user.username;

  console.log("he",post);

  try {
    const createdPost = await Posts.create(post);
    res.json(createdPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post." });
  }
});


router.put("/title", async (req, res) => {
  const { newTitle, id } = req.body;
  try {
    await Posts.findByIdAndUpdate(id, { title: newTitle });
    res.json(newTitle);
  } catch (error) {
    res.status(500).json({ message: "Error updating title." });
  }
});

router.put("/postText", async (req, res) => {
  const { newText, id } = req.body;
  try {
    await Posts.findByIdAndUpdate(id, { postText: newText });
    res.json(newText);
  } catch (error) {
    res.status(500).json({ message: "Error updating postText." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Posts.findByIdAndDelete(id);
    res.json("DELETED SUCCESSFUL");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post." });
  }
});

module.exports = router;
