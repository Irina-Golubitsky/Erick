import gql from 'graphql-tag';


export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      active
      role
      department
      
      
    }
  }
`;
export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
     
      email
      active
      role
      department
      
      
      
    }
  }
`;
export const QUERY_ACTIVEMANAGERS = gql`
  query activemanagers {
    activemanagers {
      _id
      username
     
      email
      active
      role
      department
      cases {
        _id
        createdAt
        username
        dol
        sol
        typesol
        fv
        client
        passenger
        typecase
        liability
        levelinjury
        phase
        propertyd
        policy
        umbrella
        umuim
        med
        lps
        def
        status
        level
        lastupdate
        show
        
        }
      
      
      
    }
  }
`;
export const QUERY_DEMANDUSERS = gql`
  query demandusers {
    demandusers {
      _id
      username
     
      email
      active
      role
      department
      cases {
        _id
        createdAt
        username
        dol
        sol
        typesol
        fv
        client
        passenger
        typecase
        liability
        levelinjury
        phase
        propertyd
        policy
        umbrella
        umuim
        med
        lps
        def
        status
        level
        lastupdate
        show
        
        }
      
      
      
    }
  }
`;

export const QUERY_GETUSERSBYROLE = gql`
query getusersbyrole($role: String!) {
  getusersbyrole(role: $role) {
    _id
    username
    email
    active
    role
    department
    cases {
      _id
      createdAt
      username
      dol
      sol
      typesol
      fv
      client
      passenger
      typecase
      liability
      levelinjury
      phase
      propertyd
      policy
      umbrella
      umuim
      med
      lps
      def
      status
      level
      lastupdate
      show
      demandmem
      transferedtodemand
      transferedtonego
      negomem
      dletter
      offerreceived
      transferedtoliti
      litimem
      medicalbill
      finalmedicalbill
      offer
      tenderedpolicy
      boicourttransfer
      negonotes
      language
      finaloffer
      feesper
      feesmoney
      negostatus
      negoclaim
      outclient
      outrandal
      lastcall
    }
  }
}
`;


export const QUERY_ME = gql`
  {
    me { 
      _id
      username
      email
      active
      role
      department
      cases {
        _id
        createdAt
        username
        dol
        sol
        typesol
        fv
        client
        passenger
        typecase
        liability
        levelinjury
        phase
        propertyd
        policy
        umbrella
        umuim
        med
        lps
        def
        status
        level
        lastupdate
        show
        demandmem
        transferedtodemand
        transferedtonego
        negomem
        dletter
        offerreceived
        transferedtoliti
        litimem
        medicalbill
        offer
        tenderedpolicy
        boicourttransfer
        negonotes
        language
        finaloffer
        finalmedicalbill
        feesper
        feesmoney
    
        negostatus
        negoclaim
        outclient
        outrandal
       
        lastcall

        
        }
    }
  }
`;
export const QUERY_CASE = gql`
  query casedata($id: ID!) {
    casedata(_id: $id) {
      _id
        createdAt
        username
        dol
        sol
        typesol
        fv
        client
        passenger
        typecase
        liability
        levelinjury
        phase
        propertyd
        policy
        umbrella
        umuim
        med
        lps
        def
        status
        level
        lastupdate
        show
        demandmem
        transferedtodemand
        transferedtonego
        negomem
        dletter
        offerreceived
        transferedtoliti
        litimem
        medicalbill
        offer
        tenderedpolicy
        boicourttransfer
        negonotes
        language
        finaloffer
        finalmedicalbill
        feesper
        feesmoney
    
        negostatus
        negoclaim
        outclient
        outrandal
       
        lastcall
      
    
    }
  }
  
`;
export const ALL_CASES = gql`
query allcases {
  allcases {
  _id
  createdAt
  username
  dol
  sol
  typesol
  fv
  passenger
  client
  typecase
  liability
  levelinjury
  phase
  propertyd
  policy
  umbrella
  umuim
  med
  lps
  def
  status
  level
  lastupdate
  show
}}


`;
export const ALL_PREFS = gql`
query preferences {
  preferences {
    name
    typesol
    typecase
    liability
    levelinjury
    phase
    policy
    level1
    level2
    level3
    umbrella
    umuim
    lps
    showactive
    showtransfer
    tenderedpolicy
    boicourttransfer
    language 
    negostatus
    negoclaim
  }
}


`;

export const NEW_DEMAND = gql`
query Newdemand {
  newdemand {
    _id
    createdAt
    username
    dol
    sol
    typesol
    fv
    passenger
    client
    typecase
    liability
    levelinjury
    phase
    propertyd
    policy
    umbrella
    umuim
    med
    lps
    def
    status
    level
    lastupdate
    show
  }
}
`;
export const QUERY_GETRANGENEGO = gql`
query getRangeNego($date1: String, $date2: String) {
  getRangeNego(date1: $date1, date2: $date2) {
    transferedtonego
    feesmoney
    client
    negoclaim
    negomem
    offer
    finaloffer
    medicalbill
    finalmedicalbill
    feesper
  }
}
`;