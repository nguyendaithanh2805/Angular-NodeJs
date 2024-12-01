const express = require('express');
const app = express();
const userRoute = require('./routes/UserRoute');

app.use(express.json());
app.use('/api/admin', userRoute);

module.exports = app;