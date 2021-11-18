const { Schema } = require('mongoose');

const eventSchema = new Schema(
  {
    userId: {
      type: String,
      required:true 
    },
    day: {
      type:String,
      required:true,
      maxlength: 10
    },
    start: {
      type: String,
      required: true,
      maxlength: 50
    },
    end: {
      type: String,
      required: true,
    
      maxlength: 50
    },
    student: {
      type: String,
      maxlength: 50
    },
    comment: {
      type: String,
      maxlength: 50
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);


module.exports = eventSchema;