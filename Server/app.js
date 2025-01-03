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
const cartRoute = require('./routes/CartRoute');
const menuRoute = require('./routes/MenuRoute');
const orderRoute = require('./routes/OrderRoute');
const orderForAdminRoute = require('./routes/OrderForAdminRoute');

app.use(express.json());

// https://viblo.asia/p/cors-policies-and-security-in-nodejs-express-n1j4lxzj4wl
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Tat ca route co tien to '/api/admin/**' deu yeu cau xac thuc
app.use('/api/admin', authMiddle.verifyToken.bind(authMiddle), authorMiddle.checkRoleAdmin.bind(authorMiddle));

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

// Menu
app.use('/api', menuRoute);


// Cart
app.use('/api', authMiddle.verifyToken.bind(authMiddle), authorMiddle.checkRoleUser.bind(authorMiddle), cartRoute);

// Order
app.use('/api', authorMiddle.checkRoleUser.bind(authorMiddle), orderRoute);
app.use('/api/admin', orderForAdminRoute);

module.exports = app;