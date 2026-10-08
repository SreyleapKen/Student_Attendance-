const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

app.use(express.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');

const JWT_SECRETE = process.env.JWT_SECRETE;


// LOGIN
app.post('/login', async (req, res) => {
    try {

        const { studentId, password, role } = req.body;

        const user = await PersonModel.findOne({
            studentId: studentId
        });

        if (!user) {
            return res.status(400).send({
                message: 'Invalid student ID or password'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).send({
                message: 'Invalid student ID or password'
            });
        }

        if (user.role !== role) {
            return res.status(403).send({
                message: 'Invalid role'
            });
        }

        const token = jwt.sign(
            {
                studentId: user.studentId,
                classCode: user.classCode,
                role: user.role
            },
            JWT_SECRETE,
            {
                expiresIn: '24h'
            }
        );

        res.status(200).json({
            message: 'Login successful',
            token: token
        });

    } catch (err) {
        res.status(500).send({
            message: err.message || 'Error logging in'
        });
    }
});


app.listen(5002, () => {
    console.log(
        'Authentication Service Server is running on PORT NO: 5002'
    );
});
