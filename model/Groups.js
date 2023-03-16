const mongoose = require('mongoose');

const GroupSchema =  mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    // image: {
    //     type:String,
    //     required:true
    // },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
})

module.exports= mongoose.model('group', GroupSchema);
