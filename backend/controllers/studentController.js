const Student = require('../models/Student');

// 1. Add Student
exports.addStudent = async (req, res) => {
    try {
        const { name, classRoom, phone, uid, rollId, division, academicYear, gender, parentName, regNo } = req.body;

        // Validation
        if (!name || !classRoom || !phone || !uid) {
            return res.status(400).json({ success: false, message: "Required fields are missing!" });
        }

        const newStudent = new Student({
            name: name.trim(),
            classRoom: classRoom.trim(),
            phone: phone.trim(),
            uid: uid.trim(),
            rollId: rollId?.trim(),
            division: division?.trim(),
            academicYear: academicYear?.trim(),
            gender: gender?.trim(),
            parentName: parentName?.trim(),
            regNo: regNo?.trim()
        });

        await newStudent.save();
        res.status(201).json({ success: true, message: "Student Added Successfully!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "UID already exists!" });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Search Student (Fixed to search by Phone and Class only)
exports.searchStudent = async (req, res) => {
    try {
        const { classRoom, phone } = req.query;

        const student = await Student.findOne({
            classRoom: classRoom.trim(),
            phone: phone.trim()
        });

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found!" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};