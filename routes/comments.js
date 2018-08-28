const {Comment, validate} =require ('../models/comment');
const mongoose =require('mongoose');
const express = require ('express');
const router =express.Router();

//read all
router.get('/', async (req ,res)=>{
    const comments =await Comment.find().sort('name');
    res.send(comments);
});
//create
router.post('/',async (req,res)=>{
    const comment =new Comment({
        content :req.body.content
    });
    await comment.save();
    res.send(comment);
})
//update
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const comment = await Comment.findByIdAndUpdate(req.params.id,
      { 
       
        content: req.body.content
      }, { new: true });
  
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    
    res.send(comment);
  });
  //delete
  router.delete('/:id', async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id);
  
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  
    res.send(comment);
  });
  //read one
  router.get('/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
  
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  
    res.send(comment);
  });
  
  module.exports = router; 