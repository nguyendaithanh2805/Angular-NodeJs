const express = require('express');
const app = express();
const userRoute = require('./routes/UserRoute');
const authenticationRoute = require('./routes/Authentication')
const authMiddle = require('./middlewares/Authentication');
const authorMiddle = require('./middlewares/Authorization');
app.use(express.json());
app.use('/api/admin/**', authMiddle.verifyToken.bind(authMiddle), authorMiddle.checkRole.bind(authorMiddle));

//login
app.use('/api', authenticationRoute)

// user
app.use('/api/admin', userRoute);

module.exports = app;