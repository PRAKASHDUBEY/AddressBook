const express = require("express");
const router = express.Router();
const auth = require('../middleware/jwt');
const pagination = require('../middleware/pagination');
const Contact = require('../models/contact_model');


//Add Single Contact
router.post("/add" , auth, async (req,  res) => {
    try{
        const contact = await Contact.create(req.body);
        await Contact.findByIdAndUpdate(contact.id,{
            $set:{user:req.user.id}
        });
        res.status(200).json({
            msg:"Contact added"
        });
    }catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});

//Add Bulk Contacts
router.post("/add-many" , auth, async (req, res) => {
    try{
        const contact = await Contact.create(req.body.contact);
        for (let i in contact){
            await Contact.findByIdAndUpdate(contact[i].id,{
                $set:{user:req.user.id}
            });
        }
        res.status(200).json({
            msg:"Contacts added"
        });
    }catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});

//Fetch Single Contact
router.get("/fetch/:id" , auth, async (req, res) => {
    try{
        const contact = await Contact.findById(req.params.id).select('-user').select('-__v');

        res.status(200).json({
            Contacts:contact
        });
    }catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});

//Fetch Phase Matching Contacts
router.get("/search", auth, async (req, res) => {
    try{
        var contact = await Contact.find({$and:[{user:req.user.id},{$or:
            [{name:{ $regex: req.query.q, $options: "xi" }},
            {email:{ $regex: req.query.q, $options: "xi" }}]
        }]}).select('-user').select('-__v');

        res.status(200).json({
            Contacts:contact
        });
    }catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});

//Fetch All Contact(with pagination)
router.get("/fetch-all" , auth, async (req, res) => {
    const {page, limit} = req.query;
    try{
        var contact = await Contact.find({user:req.user.id}).select('-user').select('-__v');
        contact = await pagination(contact,page,limit);
        res.status(200).json({
            Contacts:contact
        });
    }catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});

//Update Contact
router.put("/update/:id" , auth, async (req, res) => {
    try{
        await Contact.findByIdAndUpdate(req.params.id,{
            $set:req.body
        });
        res.status(200).json({
            msg:"Contact updated"
        });
    }catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});

//Delete Contact
router.delete("/delete/:id" , auth, async (req, res) => {
    try{
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg:"Contact deleted"
        });
    }catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});


module.exports = router;