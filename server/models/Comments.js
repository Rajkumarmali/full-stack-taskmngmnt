const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentBody: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
