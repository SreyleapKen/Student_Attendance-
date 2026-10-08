const schema_mongoose = require('mongoose');

const PersonSchema = schema_mongoose.Schema(
    {
        studentId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        classCode: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = schema_mongoose.model(
    'person_collection',
    PersonSchema
);