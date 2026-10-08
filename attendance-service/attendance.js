const express = require('express');
const app = express();

const dbconnect = require('./dbconnect.js');
const AttendanceModel = require('./attendance_schema.js');

app.use(express.json());

app.post('/attendance', async (req, res) => {
    try {

        const existingAttendance = await AttendanceModel.findOne({
            studentId: req.body.studentId,
            date: req.body.date
        });

        if (existingAttendance) {
            return res.status(409).send({
                message: 'Attendance already recorded for this date'
            });
        }

        const attendance = new AttendanceModel({
            studentId: req.body.studentId,
            date: req.body.date,
            status: req.body.status
        });

        await attendance.save();

        res.status(200).send({
            message: 'Attendance saved successfully'
        });

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
});

app.listen(5004, () => {
    console.log('Attendance Server Started at Port No: 5004');
});