import mongoose from "./index.js";

const validateEmail = (email)=>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email); 
}
const UserSchema= new mongoose.Schema({
    firstName:{type:String,required:[true,"First Name is required"]},
    lastName:{type:String,required:[true,"Last Name is required"]},
    email:{type:String,required:[true,"Email is required"],validate:validateEmail},
    password:{type:String,required:[true,"Password is required"]},
    role:{type:String,default:'customer'},
},{
    collection:"Users",
    versionKey:false
})

const usersModel = mongoose.model("User",UserSchema)

export default usersModel