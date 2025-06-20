import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name :{type:String , required:true},
    Email :{type:String , required:true , unique:true},
    Password :{type:String , required:true},
    role: { type: String, default: 'user' }, 
    verifyOtp :{type : String , default:''},
    verifyOtpExpireAt :{type : Number , default:0},
    isAccountVerified :{type : Boolean , default:false},
    restOtp :{type : String , default:''},
    restOtpExpireAt :{type : Number , default:0},

});
const UserModel = mongoose.model('user' , UserSchema)
export default UserModel;