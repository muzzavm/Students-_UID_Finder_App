require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Admin Passcode Verification Route
app.post('/api/admin/verify-passcode', (req, res) => {
    const { passcode } = req.body;
    
    // .env 
    const correctPasscode = process.env.ADMIN_PASSCODE;

    if (passcode === correctPasscode) {
        return res.json({ success: true, message: "Verification Successful" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid Passcode" });
    }
});

// 2. Student Routes
app.use('/api/students', studentRoutes);

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});