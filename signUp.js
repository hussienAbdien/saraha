const userModel=require("../../../DB/model/user")
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const sendEmail = require("../../../middleware/email")

const signUp=async (req,res)=>{
    const{userName,email,password}=req.body
    const user=await userModel.findOne({email})
    
    if(user){
        res.json({message:"email already existed"})
    }else{
        bcrypt.hash(password,8,async(err,hash)=>{
            if(err){
               res.json({ message: "hash error" })
            }else{
                const saveUser=await userModel.insertMany({userName,email,password:hash})
                var token = jwt.sign({ email }, 'shhhhh');
                let message=`<p>follow this link to confirm email</p>
                <a href="http://localhost:4000/confirmEmail/${token}">click here</a>`
                await sendEmail(email,message)
                res.json({ message: "Done", saveUser })
            }
        })
    }
}

const confirmEmail =async (req,res)=>{
    const {token}=req.params;

    if(token&&token!==undefined&&token!==null){
        const decoded=jwt.verify(token,"shhhhh")
        const user=await userModel.findOne({email:decoded.email})
        if(!user){
            res.json({message:"invalid email"})
        }else{
            if(user.confirm){
                res.json({message:'email already confirmed before'})
            }else{
                let confirmUser=await userModel.findByIdAndUpdate({_id:user._id},{confirm:true},{new:true})
                res.json({message:'user done',confirmUser})
            }
        }
    }else{
        res.json({message:"in-valid token"})
    }
}

module.exports={signUp,confirmEmail}