const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    
    active: Boolean
    role: String
    department: String
    cases:[Casedata]
    
  }

  type Casedata{
    _id: ID
    createdAt: String
    username:String
    dol: String
    sol: String
    typesol: String
    fv: String
    client: String
    passenger: String
    typecase: String
    liability: String
    levelinjury: String
    phase: String
    propertyd: String
    policy: String
    umbrella: String
    umuim:String
    med:String
    lps:String
    def:String
    status:String
    level:String
    lastupdate:String




  }

 
  
type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    casedata: [Casedata]
    user(_id: ID!): User 
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCase(
      dol: String,
      sol: String,
      typesol: String,
      fv: String,
      client: String,
      passenger: String,
      typecase: String,
      liability: String,
      levelinjury: String,
      phase: String,
      propertyd: String,
      policy: String,
      umbrella: String,
      umuim:String,
      med:String,
      lps:String,
      def:String,
      status:String,
      level:String):Casedata
    updateUser(userId:ID!,username: String, email: String, role: String, department: String, active:Boolean): User
  
  }
  `;

module.exports = typeDefs;