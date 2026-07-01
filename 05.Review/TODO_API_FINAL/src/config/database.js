import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function connectDB(){
    const dbUri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;

    try{
        await mongoose.connect(`${dbUri}/${dbName}`, {
            //useNewUrlParser:true,
            //useUnifiedTopology:true
        });

        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;