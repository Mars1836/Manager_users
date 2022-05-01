import mongoose from "mongoose";
const connectDB = async ()=>{
    try{
        const con = await mongoose.connect(process.env.MONGODB_URL+"/users_dev ");
        console.log("Connected: "+con.connection.host);
    }
    catch(err){
        console.log(err);
    }
}
export default connectDB;
