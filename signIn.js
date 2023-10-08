const userModel = require("../../../DB/model/user");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email})

    if(user){
        if(user.confirm){
            const match= bcrypt.compare(password, user.password);
       if(match){
        const token=jwt.sign({_id:user._id,userName:user.userName},"sahhhh")
        res.json({message:"login success",token})
       }else{
        res.json({mesaage:"in-valid password"})
       }
        }else{
           res.json({mesaage:"confirm the email first"})
        }}else{
        res.json({mesaage:"in-valid email"})
    }
}

module.exports={login}