const express=require('express')
const router=express.Router()
const groupController=require('../controller/groupController')
const multer=require('multer');

// const storage  = multer.diskStorage({
//     destination :(req , file , cb)=>{
//         cb(null,'upload');

//     },
//     filename :(req,file,cb)=>{
//         cb(null , Date.now()+"-"+file.originalname);
//     }
// });
// const filter = (req , file , cb)=>{
//     if(file.mimetype == "image/jpeg" || file.mimetype == 'image/png'){
//         cb(null , true);
//     }else{
//         cb(null , false);
//     }
// }
// const upload = multer({
//     storage : storage ,
//     fileFilter : filter ,   
// });

router.post('/createGroup', groupController.createGroup)
router.get('/getGroups/:page', groupController.getGroups)

module.exports=router