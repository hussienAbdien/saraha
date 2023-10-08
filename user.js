const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    // confirmPassword:String,
    imageUrl:String,
    confirm:{type:Boolean,default:false}
},{
    timestamps:true
})

const userModel=mongoose.model('User',userSchema)

module.exports=userModel