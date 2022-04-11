const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    number:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('Contact',contactSchema);