import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.get('/', (req, res) => {
    res.send('API is Working;');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});