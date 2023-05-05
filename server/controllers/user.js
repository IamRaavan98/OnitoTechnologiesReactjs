require("dotenv").config;
const FormData = require("../models/FormData");


exports.register = async(req,res)  =>{
         const data = req.body;
         let allUsersData;
    try {
        const response = await FormData.create(data)
         allUsersData  = await FormData.find();
    } catch (error) {
        console.log(error?.message);
        return res.status(400).send({
            success: false,
            message: error.message,
        })
    }
    res.status(200).send({
        success:true,
        message:allUsersData
    })

}

//we are creating this route as it may happen  someone just want check how much data is present we will store this data in cookies so not too much api call
exports.getAllData = async(req,res) => {
    try {
        const response = await FormData.find();
        if(response){
           return res.status(200).send({
                success:true,
                data:response
            })
        }
    } catch (error) {
        res.status(404).send({
            succes:false,
            message:'data not found'
        })
    }
}