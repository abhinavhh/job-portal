import express, { Application, Request, Response } from 'express';
import connectDB from './config/connectDB';
import Loginrouter from './routes/Auth/login';
import registerRouter from './routes/Auth/register';
import authRouter from './routes/Auth/autherize';
import ForgetPassRouter from './routes/Auth/forget-password';
import VerifyOtpRouter from './routes/Auth/otpVerification';

const app: Application = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

// run on port
app.use('/api', Loginrouter);
app.use('/api', registerRouter);
app.use('/api', authRouter);
app.use('/api', ForgetPassRouter);
app.use('/api', VerifyOtpRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})