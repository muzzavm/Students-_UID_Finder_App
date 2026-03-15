import axios from 'axios';
const API_URL = 'https://students-uid-finder-app.onrender.com/api/students';

export const searchStudents = (query) => axios.get(`${API_URL}/search?query=${query}`);