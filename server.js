// IMPORTS
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoute = require('./App/Routes/userRoute.js');
const connectDB = require('./db.js');
const sessionMiddleware = require('./App/Middlewares/sessionMiddleware.js');
// MIDDLEWARES
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware)
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SEC_KEY
});

// ROUTES
app.use('/api/v1/user/', userRoute);


// DATABASE CONNECTION
connectDB()


// PORT & LISTEN
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})