const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    classRoom: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    uid: { type: String, required: true, unique: true, trim: true },
    rollId: { type: String, trim: true },
    division: { type: String, trim: true },
    academicYear: { type: String, trim: true },
    gender: { type: String, trim: true },
    parentName: { type: String, trim: true },
    regNo: { type: String, trim: true }
});

module.exports = mongoose.model('Student', studentSchema);