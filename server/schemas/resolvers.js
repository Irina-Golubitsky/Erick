const { AuthenticationError } = require('apollo-server-express');
const { User, Casedata, Preferences } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate({path: 'cases', options: { sort: { 'dol': -1 } } }) 
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      users: async () => {
        return User.find()
          .select('-__v -password')
          .populate('cases')
       
        
      },
      preferences: async () => {
        return Preferences.findOne({ "name":"myprefs" })
       
        
      },
      activemanagers: async () => {
        return User.find(( { "active": true, "role": "Case Manager" } ))
          .select('-__v -password')
          .sort( { "department": 1 } )  
          .populate({path: 'cases', options: { sort: { 'dol': -1 } } })
       
        
      },
      getusersbyrole: async (parent, { role }) => {
        return User.find(( { "active": true, "role": role } ))
          .select('-__v -password')
          .sort( { "department": 1 } )  
          .populate({path: 'cases', options: { sort: { 'dol': -1 } } })
       
        
      },
      demandusers: async () => {
        return User.find(( { "active": true, "role": "Demand" } ))
          .select('-__v -password') 
          .populate({path: 'cases', options: { sort: { 'dol': -1 } } })
       
        
      },
      casesdata: async () => {
        return Casedata.find()
         
        
      },
      user: async (parent, { _id }) => {
        return User.findOne({ _id })
          .select('-__v -password')
        
      },
      casedata: async (parent, { _id }) => {
        return Casedata.findOne({ _id })
        
        
        
      },
      allcases: async () => {
        return Casedata.find()
        .sort( { "username": 1 , "dol":-1} )   
      
    },
    newdemand:async () =>  {
      return Casedata.find({

            $or: [
              { phase: 'Demand'},
              { phase: 'Litigation'},
              { phase: 'Negotiation'},
           
            ]
          ,
            $and: [
             
              { demandmem: null }
             
            ]
          })
          
       
      .sort( { "username": 1 , "dol":-1} )  
    
  },
    caseStage: async () => {
      return Casedata.aggregate( [
        // Stage 1: Filter pizza order documents by pizza size
      
      
        {
           $match: { }
        },
        // Stage 2: Group remaining documents by pizza name and calculate total quantity
        {
           $group: { _id: {username: "$username",
                      phase:"$phase", user_info:"$user_info"},
             phaseCount: { $sum: 1 } 
            }},
            {$sort : {_id:1}}
        
         
     ] )
    
  },

  getRangeNego: async (parent, { date1,date2 }) => {
    return Casedata.find({ 
      "transferedtonego": {
          $gte:`${date1}T00:00:00.000Z`, 
          $lt: `${date2}T23:59:59.999Z`
      },
      "feesmoney":{$gt:0}

  })
  .sort( { "negomem": 1} ) 
  
}
  

    
 
  

  
},
  
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
       updateUser: async (parent, { userId, username, email, role, department,active }, context) => {
       if (context.user) {
        
        // , email:email, role:role, department:department, active:active

        return await User.findOneAndUpdate(
          { _id: userId },
          { $set:{ username: username, email:email, role:role, department: department, active:active}},
          {
            new: true,
          }
          );
      }

      throw new AuthenticationError('Not logged in');
    },
    addCase: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user.username);
        const casedata = await Casedata.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { cases: casedata._id } },
          { new: true }
        );

        return casedata;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addData: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user.username);
        const casedata = await Casedata.create({ ...args });

        await User.findOneAndUpdate(
          { username: args.username},
          { $push: { cases: casedata._id } },
          { new: true }
        );

        return casedata;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addDemand: async (parent, args, context) => {
      if (context.user) {
        let phase="Demand";
       
        if (args.transferedtonego!==""){phase="Negotiation" }
        console.log(context.user.username);
        const casedata = await Casedata.findOneAndUpdate(
          {fv:args.fv},
          { ...args, phase:phase },
          {new: true,
          upsert:true,
          setDefaultsOnInsert: true}
          );

        await User.findOneAndUpdate(
          { username: "Sandra Casillas", "cases._id":{$ne:casedata._id}},
          { $push: { cases: casedata._id } },
          { new: true }
        );

        return casedata;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addNego: async (parent, args, context) => {
      if (context.user) {
        let phase="Negotiation";
       
        if (args.outrandal!==""){phase="Storage" }
        console.log(context.user.username);
        const casedata = await Casedata.findOneAndUpdate(
          {fv:args.fv},
          { ...args, phase:phase },
          {new: true,
          upsert:true,
          setDefaultsOnInsert: true}
          );

        await User.findOneAndUpdate(
          { username: args.negomem, "cases._id":{$ne:casedata._id}},
          { $push: { cases: casedata._id } },
          { new: true }
        );

        return casedata;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    
    updateCase: async (parent, args, context) => {
      if (context.user) {
       console.log(args);
       caseId=args.caseId;
       delete args.caseId;
       console.log(args);

       return await Casedata.findOneAndUpdate(
         { _id: caseId},
         { $set:{ ...args, lastupdate:Date.now()}},
         {
           new: true,
         }
         );
     }

     throw new AuthenticationError('Not logged in');
   },
   reassignCase: async (parent, { username, caseid, olduser }, context) => {

    if (context.user) {
        await User.findOneAndUpdate(
          { username: username },
          { $push: { cases: caseid } },
          { new: true }
        );
        await User.findOneAndUpdate(
          { username: olduser },
          { $pull: { cases: caseid } },
          { new: true }
        );


        return await Casedata.findOneAndUpdate(
          { _id: caseid },
          { $set: { username: username } },
          {
            new: true,
          }
        );
      }

      throw new AuthenticationError('Not logged in');

      },
      negotoNego: async (parent, { username, caseid, olduser, transferedtonego }, context) => {

        if (context.user) {
            await User.findOneAndUpdate(
              { username: username },
              { $push: { cases: caseid } },
              { new: true }
            );
            await User.findOneAndUpdate(
              { username: olduser },
              { $pull: { cases: caseid } },
              { new: true }
            );
    
    
            return await Casedata.findOneAndUpdate(
              { _id: caseid },
              { $set: { negomem: username, transferedtonego:transferedtonego } },
              {
                new: true,
              }
            );
          }
    
          throw new AuthenticationError('Not logged in');
    
          },

      assignDemand: async (parent, { username, caseid }, context) => {

        if (context.user) {
            await User.findOneAndUpdate(
              { username: username },
              { $push: { cases: caseid } },
              { new: true }
            );
            return await Casedata.findOneAndUpdate(
              { _id: caseid },
              { $set: {  demandmem: username, transferedtodemand:Date.now() } },
              {
                new: true,
              }
            );
          }
    
          throw new AuthenticationError('Not logged in');
    
          },
          sendToDemandmember: async (parent, {  caseid,demandmem }, context) => {

            if (context.user) {
                await User.findOneAndUpdate(
                  { username: demandmem },
                  { $push: { cases: caseid } },
                  { new: true }
                );
                return await Casedata.findOneAndUpdate(
                  { _id: caseid },
                  { $set: {  demandmem: demandmem, transferedtodemand:Date.now(), phase:"Demand",show:"newdemand" } },
                  {
                    new: true,
                  }
                );
              }
        
              throw new AuthenticationError('Not logged in');
        
              },
          sendBack: async (parent, { caseid,phase, olduser }, context) => {
         

            if (context.user) {

           

              await User.findOneAndUpdate(
                { username: olduser },
                { $pull: { cases: caseid } },
                { new: true }
              );
              if (phase==="Demand"){
                
                return await Casedata.findOneAndUpdate(
                  { _id: caseid },
                  { $set: { phase: "Investigation & Treatment", transferedtodemand:null, demandmem:null } },
                  {
                    new: true,
                  }
                );


              } else if (phase==="Negotiation"){ 
                return await Casedata.findOneAndUpdate(
                  { _id: caseid },
                  { $set: { phase: "Demand", transferedtonego:null, negomem:null } },
                  {
                    new: true,
                  }
                );
              }
              else { 
                return await Casedata.findOneAndUpdate(
                  { _id: caseid },
                  { $set: { phase: "Demand", transferedtoliti:null, litimem:null } },
                  {
                    new: true,
                  }
                );
              }
      
      
            
            }
      
            throw new AuthenticationError('Not logged in');
      
            },

          transferNego: async (parent, { phase, negomem, transferedtonego, caseid }, context) => {

            if (context.user) {
                await User.findOneAndUpdate(
                  { username: negomem },
                  { $push: { cases: caseid } },
                  { new: true }
                );
                return await Casedata.findOneAndUpdate(
                  { _id: caseid },
                  { $set: {  phase:phase, negomem:negomem, transferedtonego:transferedtonego} },
                  {
                    new: true,
                  }
                );
              }
        
              throw new AuthenticationError('Not logged in');
        
              },

   updatePrefs: async (parent, args, context) => {
    if (context.user) {
    console.log(args);

     return await Preferences.findOneAndUpdate(
       { name: "myprefs"},
       { $set:{ ...args}},
       {
         new: true,
       }
       );
   }

   throw new AuthenticationError('Not logged in');
 },
 createPrefs: async (parent, args, context) => {
  if (context.user) {
  

    return await Preferences.create({ ...args, name: "myprefs" });
 }

 throw new AuthenticationError('Not logged in');
},
   cleanAll: async (parent, args, context) => {
    // if (context.user) {
     

      await User.update({}, { $set : {'cases': [] }} , {multi:true} )
      await Casedata.remove({})

     
return "yes"
// }
//    throw new AuthenticationError('Not logged in');
 },
 clearSandra: async (parent, args, context) => {
  // if (context.user) {
   

    return User.findOneAndUpdate({username:"Sandra Casillas"}, { $set : {'cases': [] }} , {new:true} )
    

   
return "yes"
// }
//    throw new AuthenticationError('Not logged in');
},
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
        return { token, user };
      }
    }
  };
  
  module.exports = resolvers;