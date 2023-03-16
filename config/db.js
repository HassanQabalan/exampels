const mongoose=require('mongoose')
const dataconfig= require('./dataconfig').db
const connectDB= async ()=>{
try{
    const connec=await mongoose.connect(dataconfig,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    
    console.log("mongoose connected...");
}
catch(err){
    console.log(err);
    process.exit(1)
}
}

module.exports=connectDB