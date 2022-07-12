const { AuthenticationError } = require('apollo-server-express');
const { User, Casedata, Preferences } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate({path: 'cases', options: { sort: { 'dol': 1 } } }) 
  
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
          .populate({path: 'cases', options: { sort: { 'dol': 1 } } })
       
        
      },
      demandusers: async () => {
        return User.find(( { "active": true, "role": "Demand" } ))
          .select('-__v -password') 
          .populate({path: 'cases', options: { sort: { 'dol': 1 } } })
       
        
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