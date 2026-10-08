const express = require('express');
const app = express();

app.use(express.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');


// VIEW OWN PROFILE
app.get('/viewprofile', async (req, res) => {
    try {

        const studentId = req.headers['x-user-studentid'];

        const user = await PersonModel.findOne({
            studentId: studentId
        });

        if (!user) {
            return res.status(404).send({
                message: 'Student not found'
            });
        }

        res.status(200).send(user);

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
});


// UPDATE OWN PROFILE
app.put('/updateprofile', async (req, res) => {
    try {

        const studentId = req.headers['x-user-studentid'];

        const updatedUser = await PersonModel.findOneAndUpdate(
            { studentId: studentId },
            {
                $set: {
                    name: req.body.name,
                    classCode: req.body.classCode
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({
                message: 'Student not found'
            });
        }

        res.status(200).send({
            message: 'Profile updated successfully',
            student: updatedUser
        });

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
});


app.listen(5003, () =>
    console.log('Student Service Started at Port No: 5003')
);