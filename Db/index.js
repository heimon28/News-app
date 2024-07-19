import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const  connectDb = async () => {
    try {
   
   const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`,
    { connectTimeoutMS: 30000, socketTimeoutMS: 30000 }
   )
   console.log(`\n MongoDb connect successfully and host at ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log('MongoDB connection faild', error);
        throw error
        
    }

}

export default connectDb