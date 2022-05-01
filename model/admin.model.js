import mongoose from 'mongoose';
await mongoose.connect(process.env.MONGODB_URL+'/users_dev ');
const adminScheme = mongoose.Schema(
    {
        email : String,
        password : String,
        infor:{
            name : String,
            avatar : String,
            position : String,
            decription : String
        }
    }
)
const adminModel = mongoose.model('admin',adminScheme,'admins')
export default adminModel;