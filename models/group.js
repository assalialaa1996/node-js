//imports
const mongoose =require ('mongoose');
const Joi =require ('joi');
//declare schema
const groupSchema =new mongoose.Schema(
    {
        name :{
            type :String,
            require :true,
            maxlength :15
        },
        type :{
            type :String,
            require : true,
            maxlength :15
        }
    }
);
//declare model
const Group =mongoose.model ('Group',groupSchema);

//validate data

function validateGroup(group) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(group, schema);
  }

//exports
exports.groupSchema=groupSchema;
exports.Group=Group
exports.validateGroup=validateGroup;
