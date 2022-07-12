const { Schema, model } = require('mongoose');


const prefSchema = new Schema(
  {
      name:{
          type:String,
          unique: true},
    typesol: [String],
    typecase: [String],
    liability: [String],
    levelinjury: [String],
    phase: [String],
    policy: [String],
    level1: [String],
    level2: [String],
    level3: [String],
    umbrella: [String],
    umuim: [String],
    lps: [String],
    showactive: [String],
    showtransfer: [String],
    tenderedpolicy: [String],
    boicourttransfer:[String],
    language:[String],
    negostatus:[String],
    negoclaim:[String]


  }
);




const Preferences = model('Preferences', prefSchema);

module.exports = Preferences;
