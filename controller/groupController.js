require('dotenv').config();
const Group = require('../model/Groups')
const jwt= require('jsonwebtoken');

var apis={
    createGroup: async(req,res)=>{
        try{
            const group = await Group.findOne({name:req.body.name});
            if(group){
               return res.json({success:false,msg:'This group is already exists'})
            }else{
             const newGroup =new Group({
                name:req.body.name,
            })
            const savedGroup= await newGroup.save();
            res.json({success:true, group:savedGroup})
            }
        }catch(error){
            res.json({success:false,msg:error.message})
        }
    },
    getGroups:async(req,res)=>{
        try{
            const page = parseInt(req.params.page)
            const limit = 10; // default to 10 items per page if query parameter not provided
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const result={};
            const count = await Group.countDocuments().exec();
            result.totalCount = count;

            if (endIndex < count) {
                result.next = {
                  page: page + 1,
                  limit: limit
                };
              }
            if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            };
            }
            let pagesNum = Math.ceil(count/10);
            const groups = await Group.find().limit(limit).skip(startIndex);
               return res.json({success:true,countOfPages:pagesNum,groups})
        }catch(error){
            res.json({success:false,msg:error.message})
        }
    }

}

module.exports=apis