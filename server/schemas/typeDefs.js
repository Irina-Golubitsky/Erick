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
    show:String
    demandmem:String
    transferedtodemand:String
    transferedtonego:String
    negomem:String
    dletter:String
    offerreceived:String
    transferedtoliti:String
    litimem:String
    medicalbill: Float
    finalmedicalbill:Float
    offer: Float
    tenderedpolicy:String
    boicourttransfer:String
    negonotes:String
    language:String
    finaloffer:Float
    feesper:Float
    feesmoney:Float

    negostatus:String
    negoclaim:String
    outclient:String
    outrandal:String
   
    lastcall:String
   





  }
  type Preferences{
    name:String
    typesol: [String]
    typecase: [String]
    liability: [String]
    levelinjury: [String]
    phase: [String]
    policy: [String]
    level1: [String]
    level2: [String]
    level3: [String]
    umbrella: [String]
    umuim: [String]
    lps: [String]
    showactive: [String]
    showtransfer: [String]   
    tenderedpolicy: [String],
    boicourttransfer:[String],
    language:[String], 
    negostatus:[String],
    negoclaim:[String]

  }
  type CS2{
    username:String
   
    phase:String
    
    

  }
  type CS{
    _id: CS2
    phaseCount:Int
    

  }

 

 
  
type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    preferences: Preferences
    casesdata: [Casedata]
    user(_id: ID!): User 
    casedata(_id: ID!): Casedata
    allcases:[Casedata]
    activemanagers:[User]
    getusersbyrole(role:String!):[User]
    caseStage:[CS]
    newdemand:[Casedata]
    demandusers:[User]
    getRangeNego(date1:String,date2:String):[Casedata]
    
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
      level:String,
      show:String):Casedata
      addData(
        username: String,
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
        level:String,
        show:String):Casedata
      updateCase(caseId:ID!,
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
        level:String,
        show:String,
        transferedtodemand: String,
        demandmem:String,
        dletter:String,
        offerreceived:String,
        transferedtonego:String,
        negomem: String,
        transferedtoliti: String,
        litimem: String,
        medicalbill:Float,
        offer:Float,
        tenderedpolicy:String,
        boicourttransfer:String,
        negonotes:String,
        language:String,
        finaloffer:Float,
        finalmedicalbill:Float,
        feesper:Float,
        feesmoney:Float,
        lastcall:String,
        negostatus:String,
        outclient:String,
        outrandal:String,
        negoclaim:String

        ):Casedata  
    updateUser(userId:ID!,username: String, email: String, role: String, department: String, active:Boolean): User
    updatePrefs(typesol: [String],
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
      tenderedpolicy:[String],
      boicourttransfer:[String],
      language:[String],
      negostatus:[String],
    negoclaim:[String]): Preferences
   
        createPrefs(typesol: [String],
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
          tenderedpolicy:[String],
          boicourttransfer:[String],
          language:[String],
          negostatus:[String],
    negoclaim:[String] ): Preferences
    cleanAll(aa:String):String
    reassignCase(username:String!, caseid:ID!, olduser:String!):Casedata
    assignDemand(username:String!, caseid:ID!):Casedata
    transferNego(phase:String!, negomem:String!, transferedtonego:String!, caseid:ID!):Casedata
    sendBack(caseid:ID!, phase:String!,olduser:String!):Casedata
    negotoNego(username:String!, caseid:ID!, olduser:String!, transferedtonego:String!):Casedata
    sendToDemandmember(caseid:ID!,demandmem:String!):Casedata
    addDemand(client:String, fv:String, dol:String,transferedtodemand:String, dletter:String, offerreceived:String, transferedtonego:String, negomem:String,
      medicalbill:Float, offer:Float, tenderedpolicy:String,boicourttransfer:String, username:String, negonotes:String, phase:String):Casedata
    addNego(negomem:String,username:String,client:String, fv:String, language:String, dol:String,transferedtonego:String, offer:Float,finaloffer:Float, medicalbill:Float, finalmedicalbill:Float,
        feesper:Float, feesmoney:Float, lastcall:String,negostatus:String, negoclaim:String, umuim:String,med:String, negonotes:String, outclient:String, outrandal:String, phase:String):Casedata
      clearSandra(aa:String):User
    
  
  
  }
  `;

module.exports = typeDefs;