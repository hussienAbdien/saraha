const mongoose=require('mongoose')

const connectDB=async()=>{
    return await  mongoose.connect('mongodb://localhost/sara7a').then((res)=>{
        console.log("connected");
    }).catch((err)=>{
        console.log("faild connect db",err);
    })
}

module.exports=connectDB