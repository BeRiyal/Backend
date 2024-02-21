const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Assuming you have a User model
  }]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
