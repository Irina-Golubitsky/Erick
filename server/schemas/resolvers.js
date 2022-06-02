const { AuthenticationError } = require('apollo-server-express');
const { User, Casedata } = require('../models');
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