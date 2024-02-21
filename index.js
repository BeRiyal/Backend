const express = require('express');
const bodyParser = require('body-parser');

//local imports
const connectDB = require('./db.js');
const userRoutes = require('./controller/UserController.js');
const teamRoutes = require('./controller/TeamController.js');
//initialize express
const app = express();

//middleware
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
//connect to database
const port = process.env.PORT || 5085;
connectDB()
    .then(() => {
        console.log('MongoDB connected')
     //   app.listen(process.env.PORT, () => console.log(process.env.PORT));
        app.listen(port, () => console.log('Server running on port 3000'));
    })
    .catch((err) => console.log(err));
