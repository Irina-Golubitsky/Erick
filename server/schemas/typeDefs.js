const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    title: String
    about: String
    contacts: String
    fullname: String
    nb:String

  }
type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
  
  
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(title: String, about: String, contacts: String, fullname: String, nb: String): User
  
  }
  `;

module.exports = typeDefs;