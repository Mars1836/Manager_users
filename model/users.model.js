import mongoose from "mongoose";
import mongoose_delete from 'mongoose-delete';
await mongoose.connect(process.env.MONGODB_URL+'/users_dev ');

var userSchema = new mongoose.Schema({
      name: String,
      email: String,
      phone: String,
      address: String
})

userSchema.plugin(mongoose_delete, { deletedAt : true })
userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

let userModel = mongoose.model('user',userSchema,'users');
export default userModel
