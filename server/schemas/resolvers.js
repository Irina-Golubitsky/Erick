const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate ('students')
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      users: async () => {
        return User.find()
          .select('-__v -password')
        
      },
      user: async (parent, { _id }) => {
        return User.findOne({ _id })
          .select('-__v -password')
        
      },
      
      
    },
  
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
       updateUser: async (parent, { userId, username, email, role, department,active }, context) => {
      // if (context.user) {
        
        // , email:email, role:role, department:department, active:active

        return await User.findOneAndUpdate(
          { _id: userId },
          { $set:{ username: username, email:email, role:role, department: department, active:active}},
          {
            new: true,
          }
          );
      // }

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