const mongoose = require('mongoose');
module.exports = mongoose.model('User' ,{
    UserId:{type: String, require: true},
    Name:{type: String, require: true},
    Mobile:{type: String, require: true},
    Email:{type: String, require: true},
    Password:{type: String, require: true},
    Type:{type: String, require: true},
})