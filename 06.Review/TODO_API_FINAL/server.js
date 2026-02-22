import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import routes from './src/routes/index.js';
import logger from './src/middlewares/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();
app.use(express.json());
app.use(logger);


app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('API is working');  
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})