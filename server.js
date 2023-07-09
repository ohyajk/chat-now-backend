// IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoute = require('./App/Routes/userRoute.js');
const connectDB = require('./db.js');


// MIDDLEWARES
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES
app.use('/api/v1', userRoute);


// DATABASE CONNECTION
connectDB()


// PORT & LISTEN
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})