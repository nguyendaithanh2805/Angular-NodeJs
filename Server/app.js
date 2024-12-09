const express = require('express');
const app = express();
const userRoute = require('./routes/UserRoute');
const authenticationRoute = require('./routes/Authentication')
const authMiddle = require('./middlewares/Authentication');
const authorMiddle = require('./middlewares/Authorization');
const categoryRouter = require('./routes/CategoryRoute');
const cors = require('cors');

app.use(express.json());

// https://viblo.asia/p/cors-policies-and-security-in-nodejs-express-n1j4lxzj4wl
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use('/api/admin', authMiddle.verifyToken.bind(authMiddle), authorMiddle.checkRole.bind(authorMiddle));

// login
app.use('/api', authenticationRoute)

// user
app.use('/api/admin', userRoute);

// category
app.use('/api/admin', categoryRouter)

module.exports = app;