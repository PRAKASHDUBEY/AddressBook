const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');
const auth = require('../middleware/jwt');
const User = require('../models/user_model');
const Contact = require('../models/contact_model');



//REGISTER
router.post("/register", async (req, res) => {
    const {phone, password} = req.body;
    try{
        let user_phone_exist = await User.findOne({phone:phone});

        if(user_phone_exist){
            return res.status(409).json({
                msg:'User already exist'
            });
        }
        let user = new User();
        user.phone = phone;
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        await user.save();
        const payload ={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, process.env.jwtUserSecret,{
            expiresIn:30000
        }, (err, token)=>{
            if (err) throw err;
            res.status(201).json({
                msg:'Registered successfully',
                token:token
            });
        })
    
    }catch(err){
        res.status(500).json({
            msg:`Server Error`
        })
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    const {phone, password} = req.body;
    try{
        let user = await User.findOne({phone:phone});

        if(!user){
            return res.status(404).json({
                msg:'User does not exist, Resister to continue!'
            });
        }
        const isMatch = await bcryptjs.compare(password, user.password);    
        if(!isMatch){
            return res.status(401).json({
                msg:'Inavalid Credentials'
            })
        }   
        const payload = {
            user:{
                id:user.id
            }
        }   
        jwt.sign(payload, process.env.jwtUserSecret,{
            expiresIn:300000
        },(err, token)=>{
            if (err) throw err;
            res.status(200).json({
                token:token
            });
        })  
    }catch(err){
        res.status(500).json({
            msg:`Server Error`
        })
    }
});

//Reset password
router.put("/reset-password" , auth, async (req, res) => {
    try{
        const {oldpass, newpass} = req.body;
        const user = await User.findById(req.user.id);
        const isMatch = await bcryptjs.compare(oldpass, user.password);    
        if(!isMatch){
            return res.status(401).json({
                msg:'Inavalid Credentials'  
            })
        }
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(newpass, salt);
        await user.save();
        res.status(200).json({
            msg:"Succesfully Password reset"
        });
    }catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});

//Delete profile
router.delete("/delete" , auth, async (req, res) => {
    try{
        await User.findByIdAndDelete(req.user.id);
        await Contact.deleteMany({user:req.user.id});
        res.status(200).json({
            msg:'Profile and related contacts Deleted'
        });
    }catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});


module.exports = router;