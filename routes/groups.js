//imports
const mongoose =require('mongoose');
const express = require('express');
const router =express.Router();
const {Group,validateGroup} =require('../models/group');

//read all
router.get('/', async (req ,res)=>{
    const groups =await Post.find().sort('name');
    res.send(groups);
});
//post

router.post('/',async (req,res)=>{
    const group =new Group({
        name :req.body.name,
        type :req.body.type,
    });
    await group.save();
    res.send(group);
})
//put






//delete



module.exports = router; 