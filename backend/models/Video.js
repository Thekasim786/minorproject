const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  thumbnail: String
});

module.exports = mongoose.model('Video', videoSchema);
