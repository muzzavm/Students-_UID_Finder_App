require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', 
    methods: ['GET', 'POST']
}));

app.use(express.json());

// 1. Admin Passcode Verification Route
app.post('/api/admin/verify-passcode', (req, res) => {
    const { passcode } = req.body;
    

    const correctPasscode = process.env.PASSCODE || process.env.ADMIN_PASSCODE;

    if (passcode === correctPasscode) {
        return res.json({ success: true, message: "Verification Successful" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid Passcode" });
    }
});

// 2. Student Routes
app.use('/api/students', studentRoutes);

// Root Route 
app.get('/', (req, res) => {
    res.send("API is running... 🚀");
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});