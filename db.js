const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://riyalp99:Riyal1999@cluster0.2x02rzy.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

module.exports = () => {
    return mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true})
};