const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
  PostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts', 
    required: true,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
});

const Likes = mongoose.model('Likes', likesSchema);
module.exports = Likes;
