const mongoose = require("mongoose");

const UserSchema  = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    Age:{
        type:Date,
        required: true,
    },
    gender:{
        type:String,
        required: true,

    },
    mobile:{
        type:Number,
        unique:true,
    },
    Address:{
        type:String,
    },
    ID:{
        type:String,
        unique:true,
    },
    guardian:{
        type:String,
    },
    nationality:{
        type:String,
    },
    pincode:{
        type:Number,
    },
    Country:{
        type:String,
    },
    maritalStatus:{
        type:String,
    },
    bloodGroup:{
        type:String,
    },


})
module.exports = mongoose.model("FormData", UserSchema);
