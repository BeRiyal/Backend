const mongoose = require('mongoose');

const moodboardSchema = new mongoose.Schema({
  photoId: {
    type:String
  },
  gifIds: {
    type:String
  },
  colorPalette: {
    type: [String] // Array of strings representing colors
  },
  fonts: {
    type:String
  }
});

const Moodboard = mongoose.model('Moodboard', moodboardSchema);

module.exports = Moodboard;
