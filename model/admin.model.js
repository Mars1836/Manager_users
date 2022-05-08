import mongoose from 'mongoose';

const adminScheme = mongoose.Schema(
    {
        email : String,
        infor:{
            name : String,
            avatar : String,
            position : String,
            decription : String
        },
        users:[mongoose.ObjectId],
        password: String
    }
)
const adminModel = mongoose.model('admin',adminScheme,'admins')
export default adminModel;