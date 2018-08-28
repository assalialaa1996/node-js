//imports
const Joi = require('joi');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  date:{
    type: Date, default: Date.now 
  }
});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(comment, schema);
}

//exports
exports.commentSchema = commentSchema;
exports.Comment = Comment; 
exports.validate = validateComment;