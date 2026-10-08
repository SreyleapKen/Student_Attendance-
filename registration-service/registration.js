const express = require('express');
const app = express();

const bcrypt = require('bcryptjs');

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');

app.use(express.json());


// REGISTER STUDENT OR ADMIN
app.post('/userregister', async (req, res) => {
    try {

        const existingUser = await PersonModel.findOne({
            studentId: req.body.studentId
        });

        if (existingUser) {
            return res.status(409).send({
                message: 'Student ID already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const pobj = new PersonModel({
            studentId: req.body.studentId,
            name: req.body.name,
            classCode: req.body.classCode,
            password: hashedPassword,
            role: req.body.role
        });

        await pobj.save();

        res.status(200).send({
            message: 'Registration successful'
        });

    } catch (err) {
        res.status(500).send({
            message: err.message || 'Error registering user'
        });
    }
});


app.listen(5001, () =>
    console.log('EXPRESS Server Started at Port No: 5001')
);
