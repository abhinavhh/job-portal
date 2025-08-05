import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try{
        const mongouri = process.env.MONGODB_URI;
        if(!mongouri) {
            throw new Error('MongoDB uri is not defined in env');
        }
        mongoose.connect(mongouri, {
            
        });
        console.log('MongoDb connected successfully')
    }
    catch( err ) {
        console.error('Error connecting to MongoDb:', err);
        process.exit(1);
    }
}
export default connectDB;