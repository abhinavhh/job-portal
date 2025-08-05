import express, { Application, Request, Response } from 'express';
import connectDB from './config/connectDB';
import Loginrouter from './routes/Auth/login';
const app: Application = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

// run on port
app.use('/api/auth', Loginrouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})