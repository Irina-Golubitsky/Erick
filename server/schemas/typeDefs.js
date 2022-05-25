const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    
    active: Boolean
    role: String
    department: String
    
  }

 
  
type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(_id: ID!): User 
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(userId:ID!,username: String, email: String, role: String, department: String, active:Boolean): User
  
  }
  `;

module.exports = typeDefs;