const { Schema } = require('mongoose');

const studentsSchema = new Schema(
  {
    studentname: {
      type: String,
      required: true,
      maxlength: 50
    },
    username: {
        type: String
     
     
      },
  },
  {
    toJSON: {
      getters: true
    }
  }
);


module.exports = studentsSchema;