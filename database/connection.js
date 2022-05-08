import mongoose from "mongoose";
const connectDB = async ()=>{
    try{
        const con = await mongoose.connect("mongodb+srv://hauvu:123@cluster0.omhn5.mongodb.net/users_dev?retryWrites=true&w=majority");
        console.log("Connected: "+con.connection.host);
    }
    catch(err){
        console.log(err);
    }
}
export default connectDB;
