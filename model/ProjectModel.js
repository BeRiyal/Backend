const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  videoId: {
    type:String
  },
  moodbord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moodbord'
  },
  audioId: {
    type: String
  },
  resourceId: {
    type: String
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
