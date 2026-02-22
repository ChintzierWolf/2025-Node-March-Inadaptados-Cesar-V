import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() 
{
    const dbURI = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;
    
    try 
    {
        await mongoose.connect(`${dbURI}/${dbName}`, {
        //userNewUrlParser:true,
        //useUnifiedTopology:true
        }); 
    
        console.log('MongDB is connected');
    }
    
    catch (error) 
    {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;