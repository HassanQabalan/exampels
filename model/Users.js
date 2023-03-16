const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');

const UserSchema =  mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type: String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
    },
    birthdate:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    profileImage: String,
    active:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:["ACTIVE","DISABLED","DELETED"],
        default:"ACTIVE"
    },
    role:{
        type:String,
        enum:["USER","FAMOUS"],
        default:"USER"
    },
    exampels:{
        type:String,
        required:true,
    }
})

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports= mongoose.model('user', UserSchema);
