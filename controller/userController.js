require('dotenv').config();
const User = require('../model/Users')
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');

var apis={
    register: async(req,res)=>{
        try{
            const user = await User.findOne({phone:req.body.phone});
            const userbyphone = await User.findOne({email:req.body.email});
            if(user){
                return res.json({success:false,msg:'This email is already exists'})
             }
            else if(userbyphone){
               return res.json({success:false,msg:'This phone is already exists'})
            }else{
             const newUser =new User({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                birthdate:req.body.birthdate,
                country:req.body.country
            })
            const savedUser= await newUser.save();
            const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);
            res.json({success:true, user:savedUser, token})
            }
        }catch(error){
            res.json({success:false,msg:error.message})
        }
    },
    login: async (req, res) => {
        try {
            var { phone, password } = req.body;
            if(phone.startsWith('00')) {
                phone = '+' + phone.substring(2); // Replace first two characters with a plus symbol
            }
          const user = await User.findOne({ phone });
      
          if (!user) {
            return res.json({ success: false, msg: "Invalid phone or password" });
          }
      
          const isPasswordValid = await bcrypt.compare(password, user.password);
      
          if (!isPasswordValid) {
            return res.json({ success: false, msg: "Invalid phone or password" });
          }
      
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
          res.json({ success: true, user, token });
        } catch (error) {
          res.json({ success: false, msg: error.message });
        }
      },
      forgotPassword: async (req, res) => {
        try {
            const { phone } = req.params;
            const user = await User.findOne({ phone });

            if (!user) {
                return res.json({ success: false, msg: "Invalid phone number" });
            }

            res.json({success:true, phone:phone})
            
        } catch (error) {
            res.json({ success: false, msg: error.message });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { phone, newPassword } = req.body;
            const user = await User.findOne({ phone });

            if (!user) {
                return res.json({ success: false, msg: "Invalid phone number" });
            }

            user.password = newPassword;
            await user.save();

            res.json({ success: true, msg: "Password reset successfully" });
        } catch (error) {
            res.json({ success: false, msg: error.message });
        }
    },
    getUserData: async (req,res)=>{
        try{
            const userId= req.userId;
            const user= await User.findById(userId).select('-password');
            if(user)
            res.json({success:true, getUserData:user})
            else
            res.json({success:false, msg:"Not Found"})
        }catch(error){
            res.json({ success: false, msg: error.message });
        }
    } ,





    register_exampels: async(req,res)=>{
        try{
            const user = await User.findOne({phone:req.body.phone});
            const userbyphone = await User.findOne({email:req.body.email});
            if(user){
                return res.json({success:false,msg:'This email is already exists'})
             }
            else if(userbyphone){
               return res.json({success:false,msg:'This phone is already exists'})
            }else{
             const newUser =new User({
                name:"hasan",
                email:"aaaa@gmail.com",
                phone:"0797981860",
                password:"nnkl",
                birthdate:"1222",
                country:"sy",
                exampels:req.body.exampels
            })
            const savedUser= await newUser.save();
            const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);
            res.json({success:true, user:savedUser, token})
            }
        }catch(error){
            res.json({success:false,msg:error.message})
        }
    },










}

module.exports=apis