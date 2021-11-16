const { Schema } = require('mongoose');

const studentsSchema = new Schema(
  {
    studentname: {
      type: String,
      required: true,
      maxlength: 280
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = studentsSchema;