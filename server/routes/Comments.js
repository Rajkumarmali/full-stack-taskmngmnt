const express = require("express");
const router = express.Router();
const Comments = require("../models/Comments"); // Assuming you have a Mongoose model defined for Comments
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await Comments.find({ PostId: postId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving comments." });
  }
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  try {
    const createdComment = await Comments.create(comment);
    res.json(createdComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment." });
  }
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  try {
    await Comments.findByIdAndDelete(commentId);
    res.json("DELETED SUCCESSFUL");
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment." });
  }
});

module.exports = router;
