// IMPORTS
const express = require('express');
const dotenv = require('dotenv');
const defaultRoute = require('./App/Routes/defaultRoute.js');

// MIDDLEWARES
const app = express();
app.use(express.json());
dotenv.config();

// ROUTES
app.use('/api/v1', defaultRoute);

// DATABASE CONNECTION



// PORT & LISTEN
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})