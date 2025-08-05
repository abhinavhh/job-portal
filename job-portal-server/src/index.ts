import express, { Application, Request, Response } from 'express';
import connectDB from './config/connectDB';

const app: Application = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

// run on port

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})