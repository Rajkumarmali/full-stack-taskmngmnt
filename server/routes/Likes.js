const express = require("express");
const router = express.Router();
const Likes = require('../models/Likes');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post('/', validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  try {
    const found = await Likes.findOne({
      PostId: PostId,
      UserId: UserId,
    });

    if (!found) {
      await Likes.create({ PostId: PostId, UserId: UserId });
      res.json({ liked: true });
    } else {
      await Likes.deleteOne({ PostId: PostId, UserId: UserId });
      res.json({ liked: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing the like.' });
  }
});


module.exports = router;