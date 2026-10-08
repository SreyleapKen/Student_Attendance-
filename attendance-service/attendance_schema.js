const schema_mongoose = require('mongoose');

const AttendanceSchema = schema_mongoose.Schema(
    {
        studentId: { type: String, required: true },
        date: { type: String, required: true },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = schema_mongoose.model(
    'attendance_collection',
    AttendanceSchema
);