const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;
