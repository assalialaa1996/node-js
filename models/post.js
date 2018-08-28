const Joi =require ('joi');
const mongoose = require ('mongoose');
const{commentSchema} =require('./comment');
const {userSchema} =require('./user')

const Post = mongoose.model('Post',new mongoose.Schema({
title:{
    type: String,
    require: true,
    maxlength:15
},
content :{
    type :String,
    required :true
},
comments: [commentSchema] 
,
date :{
    type :Date,
    default: Date.now    
}
,
author :  userSchema
}));
function validatePost(post) {
    const schema = {
     // title: Joi.String().max(15).required(),
      //content: Joi.String().required(),
      
      date: Joi.date()
    };
  
    return Joi.validate(post, schema);
  }
exports.Post = Post; 
exports.validate = validatePost;