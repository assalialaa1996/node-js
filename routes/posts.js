const {Post, validate} =require ('../models/post');
const mongoose =require('mongoose');
const express = require ('express');
const router =express.Router();

//read all
router.get('/', async (req ,res)=>{
    const posts =await Post.find().sort('name');
    res.send(posts);
});
//create
router.post('/',async (req,res)=>{
    const post =new Post({
        title :req.body.title,
        content :req.body.content,
        comments :
              req.body.comments
    });
    await post.save();
    res.send(post);
})
//update post
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

     post = await Post.findByIdAndUpdate(req.params.id,
      { 
        title: req.body.title,
        content: req.body.content
      }, { new: true });
  
    if (!post) return res.status(404).send('The post with the given ID was not found.');
    
    res.send(post);
  });
//add a comment
router.put('/comment/:id', async (req, res) => {
  //  const { error } = validate(req.body); 
   // if (error) return res.status(400).send(error.details[0].message);

     post = await Post.findByIdAndUpdate(req.params.id,
      { 
        title: req.body.title,
        content: req.body.content,
        $push: {"comments": req.body.comments}
      }, { new: true });
  
    if (!post) return res.status(404).send('The post with the given ID was not found.');
    
    res.send(post);
  });
  //delete
  router.delete('/:id', async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id);
  
    if (!post) return res.status(404).send('The post with the given ID was not found.');
  
    res.send(post);
  });
    //delete a comment
    router.delete('/comment/:id', async (req, res) => {
      const post = await Post.findByIdAndUpdate(req.params.id,
        { 
          $pull: { "comments": { _id: req.body.id }}
        }, { new: true });
    
      if (!post) return res.status(404).send('The post with the given ID was not found.');
    
      res.send(post);
    });

    //update a comment
    router.put('/comment1/:id', async (req, res) => {
      const post = await Post.findOneAndUpdate({
        _id: req.params.id,
        'comments._id': req.body.id
    },
    {
        $set: {
            'comments.$.name' : req.body.name
        }
    })
      if (!post) return res.status(404).send('The post with the given ID was not found.');
    
      res.send(post);
    });

  //read one
  router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
  
    if (!post) return res.status(404).send('The post with the given ID was not found.');
  
    res.send(post);
  });
  
  module.exports = router; 