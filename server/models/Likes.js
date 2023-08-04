const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  // Define any specific fields you might have in the Likes model
  // For example, if you have a postId field to represent the post being liked:
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts', // Assuming you have a Posts model in MongoDB as well
    required: true,
  },
  // Add any other fields relevant to Likes
});

const Likes = mongoose.model('Likes', likeSchema);

module.exports = Likes;
