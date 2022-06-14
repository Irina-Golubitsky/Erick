const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const caseSchema = new Schema(
  {
  
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
  
    },
    username: {
      type: String
     
    },

    dol: {
      type: Date,
      
      get: timestamp => dateFormat(timestamp)
    },
    sol: {
      type: Date,
      get: timestamp => dateFormat(timestamp)
    },
    typesol:{
      type:String
    },
    fv:{
      type:String
    },
    client:{
      type:String
    },
    passenger:{
      type:String
    },
    typecase:{
      type:String,
    
    },
    liability:{
      type:String
    
    },
    levelinjury:{
      type:String
   
    },
    phase:{
      type:String
    
    },
    propertyd:{
      type:String
    
    },
    policy:{
      type:String
    
    },
    umbrella:{
      type:String
    },
    umuim:{
      type:String
    },
    med:{
      type:String
    },
    lps:{
      type:String
    },
    def:{
      type:String
    },
    status:{
      type:String
    },
    level:{
      type:String
    },
    lastupdate:{
      type:Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    show:{
      type:String
    }





    
    

  },
  {
    toJSON: {
      virtuals: true
    }
  }
);


const Casedata = model('Casedata', caseSchema);

module.exports = Casedata;
