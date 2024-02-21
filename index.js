const express = require('express');
const bodyParser = require('body-parser');

const connectDB = require('./db.js');

//initialize express
const app = express();

//middleware
app.use(bodyParser.json());


const port = process.env.PORT || 5085;
connectDB()
    .then(() => {
        console.log('MongoDB connected')
     //   app.listen(process.env.PORT, () => console.log(process.env.PORT));
        app.listen(port, () => console.log('Server running on port 5085'));
    })
    .catch((err) => console.log(err));