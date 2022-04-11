const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User',userSchema);