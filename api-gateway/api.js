const express = require('express');
const app = express();

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRETE = process.env.JWT_SECRETE;


// REGISTER
app.use('/register', (req, res) => {

    proxy.web(req, res, {
        target: 'http://localhost:5001'
    });

});


// LOGIN
app.use('/auth', (req, res) => {

    proxy.web(req, res, {
        target: 'http://localhost:5002'
    });

});


// STUDENT SERVICE
app.use('/student', (req, res) => {

    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Please send token'
        });
    }

    jwt.verify(token, JWT_SECRETE, (err, user) => {

        if (err) {
            return res.status(403).json({
                message: 'Invalid token'
            });
        }

        if (
            user.role !== 'student' &&
            user.role !== 'admin'
        ) {
            return res.status(403).json({
                message: 'Unauthorized'
            });
        }

        proxy.web(req, res, {
            target: 'http://localhost:5003',
            headers: {
                'x-user-studentid': user.studentId,
                'x-user-role': user.role
            }
        });

    });

});


// ATTENDANCE SERVICE
app.use('/attendance', (req, res) => {

    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Please send token'
        });
    }

    jwt.verify(token, JWT_SECRETE, (err, user) => {

        if (err) {
            return res.status(403).json({
                message: 'Invalid token'
            });
        }

        if (
            user.role !== 'student' &&
            user.role !== 'admin'
        ) {
            return res.status(403).json({
                message: 'Unauthorized'
            });
        }

        proxy.web(req, res, {
    target: 'http://localhost:5004',
    headers: {
        'x-user-studentid': user.studentId,
        'x-user-role': user.role,
        'content-type': 'application/json'
    }
    });

    });

});


app.listen(5000, () => {
    console.log(
        'API Gateway Service is running on PORT NO : 5000'
    );
});