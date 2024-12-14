const express = require('express');
const app = express();
const userRoute = require('./routes/UserRoute');
const authenticationRoute = require('./routes/Authentication')
const authMiddle = require('./middlewares/Authentication');
const authorMiddle = require('./middlewares/Authorization');
const categoryRoute = require('./routes/CategoryRoute');
const productRoute = require('./routes/ProductRoute');
const cors = require('cors');
const path = require('path');

app.use(express.json());

// https://viblo.asia/p/cors-policies-and-security-in-nodejs-express-n1j4lxzj4wl
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use('/api/admin', authMiddle.verifyToken.bind(authMiddle), authorMiddle.checkRole.bind(authorMiddle));

// Login
app.use('/api', authenticationRoute);

// User
app.use('/api/admin', userRoute);

// Category
app.use('/api/admin', categoryRoute);

// Product
app.use('/api/admin', productRoute);

// Cho phep cac yeu cau voi duong dan /uploads/*
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;