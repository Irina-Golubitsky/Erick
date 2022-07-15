import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        role
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $username: String, $email: String,  
     $role: String, $department: String, $active:Boolean) {
    updateUser( userId:$userId, username: $username, email: $email,  role: $role, department: $department, active: $active ) {
      _id
      username
      email
      active
      role
      department
     
    }
  }
`;

export const ADD_CASEDATA = gql`
mutation addCase($dol: String, $sol: String, $typesol: String, $fv: String, $client: String, $passenger: String, $typecase: String, $liability: String, $levelinjury: String, $phase: String, $propertyd: String, $policy: String, $umbrella: String, $umuim: String, $med: String, $lps: String, $def: String, $status: String, $level: String,$show: String) {
  addCase(dol: $dol, sol: $sol, typesol: $typesol, fv: $fv, client: $client, passenger: $passenger, typecase: $typecase, liability: $liability, levelinjury: $levelinjury, phase: $phase, propertyd: $propertyd, policy: $policy, umbrella: $umbrella, umuim: $umuim, med: $med, lps: $lps, def: $def, status: $status, level: $level,show: $show) {
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
`;
export const ADD_ALLDATA = gql`
mutation addData($username: String, $dol: String, $sol: String, $typesol: String, $fv: String, $client: String, $passenger: String, $typecase: String, $liability: String, $levelinjury: String, $phase: String, $propertyd: String, $policy: String, $umbrella: String, $umuim: String, $med: String, $lps: String, $def: String, $status: String, $level: String,$show: String) {
  addData(username: $username,dol: $dol, sol: $sol, typesol: $typesol, fv: $fv, client: $client, passenger: $passenger, typecase: $typecase, liability: $liability, levelinjury: $levelinjury, phase: $phase, propertyd: $propertyd, policy: $policy, umbrella: $umbrella, umuim: $umuim, med: $med, lps: $lps, def: $def, status: $status, level: $level,show: $show) {
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
`;
export const UPDATE_CASE = gql`
mutation updateCase($caseId: ID!, $dol: String, $sol: String, $typesol: String, $fv: String, $client: String, $passenger: String, $typecase: String, $liability: String, $levelinjury: String, $phase: String, $propertyd: String, $policy: String, $umbrella: String, $umuim: String, $med: String, $lps: String, $def: String, $status: String, $level: String, $show: String, $transferedtodemand: String, $demandmem: String, $dletter: String, $offerreceived: String, $transferedtonego: String, $negomem: String, $transferedtoliti: String, $litimem: String, $medicalbill: Float, $offer: Float, $tenderedpolicy: String, $boicourttransfer: String, $negonotes: String, $language: String, $finaloffer: Float, $finalmedicalbill: Float, $feesper: Float, $feesmoney: Float, $lastcall: String, $negostatus: String, $outclient: String, $outrandal: String,$negoclaim:String) {
  updateCase(caseId: $caseId, dol: $dol, sol: $sol, typesol: $typesol, fv: $fv, client: $client, passenger: $passenger, typecase: $typecase, liability: $liability, levelinjury: $levelinjury, phase: $phase, propertyd: $propertyd, policy: $policy, umbrella: $umbrella, umuim: $umuim, med: $med, lps: $lps, def: $def, status: $status, level: $level, show: $show, transferedtodemand: $transferedtodemand, demandmem: $demandmem, dletter: $dletter, offerreceived: $offerreceived, transferedtonego: $transferedtonego, negomem: $negomem, transferedtoliti: $transferedtoliti, litimem: $litimem, medicalbill: $medicalbill, offer: $offer, tenderedpolicy: $tenderedpolicy, boicourttransfer: $boicourttransfer, negonotes: $negonotes, language: $language, finaloffer: $finaloffer, finalmedicalbill: $finalmedicalbill, feesper: $feesper, feesmoney: $feesmoney, lastcall: $lastcall, negostatus: $negostatus, outclient: $outclient, outrandal: $outrandal, negoclaim:$negoclaim) {
    _id
  }
}
`;
export const UPDATE_PREFS = gql`
mutation updatePrefs($typesol: [String], $typecase: [String], $liability: [String], $levelinjury: [String], $phase: [String], $policy: [String], $level1: [String], $level2: [String], $level3: [String], $umbrella: [String], $umuim: [String], $lps: [String], $showactive: [String], $showtransfer: [String], $tenderedpolicy:[String],
  $boicourttransfer:[String], $language:[String], $negostatus:[String],
  $negoclaim:[String]) {
  updatePrefs(typesol: $typesol, typecase: $typecase, liability: $liability, levelinjury: $levelinjury, phase: $phase, policy: $policy, level1: $level1, level2: $level2, level3: $level3, umbrella: $umbrella, umuim: $umuim, lps: $lps, showactive: $showactive, showtransfer: $showtransfer,tenderedpolicy:$tenderedpolicy, boicourttransfer: $boicourttransfer, language:$language,
    negostatus:$negostatus,
    negoclaim:$negoclaim) {
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
export const CREATE_PREFS = gql`
mutation createPrefs($typesol: [String], $typecase: [String], $liability: [String], $levelinjury: [String], $phase: [String], $policy: [String], $level1: [String], $level2: [String], $level3: [String], $umbrella: [String], $umuim: [String], $lps: [String], $showactive: [String], $showtransfer: [String],$tenderedpolicy:[String],
  $boicourttransfer:[String], $language:[String], $negostatus:[String],
  $negoclaim:[String]) {
  createPrefs(typesol: $typesol, typecase: $typecase, liability: $liability, levelinjury: $levelinjury, phase: $phase, policy: $policy, level1: $level1, level2: $level2, level3: $level3, umbrella: $umbrella, umuim: $umuim, lps: $lps, showactive: $showactive, showtransfer: $showtransfer, tenderedpolicy:$tenderedpolicy, boicourttransfer: $boicourttransfer, language:$language,
    negostatus:$negostatus,
    negoclaim:$negoclaim) {
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
export const  REASSIGN_CASE = gql`
mutation reassignCase($username: String!, $caseid: ID!, $olduser: String!) {
  reassignCase(username: $username, caseid: $caseid, olduser: $olduser) {
    _id
    
  }
}
`;

export const  ASSIGN_DEMAND = gql`
mutation assignDemand($username: String!, $caseid: ID!) {
  assignDemand(username: $username, caseid: $caseid) {
    _id
    username
    demandmem
    
  }
}
`;

export const  TRANSFER_NEGO = gql`
mutation transferNego($phase: String!, $negomem: String!, $transferedtonego: String!, $caseid: ID!) {
  transferNego(phase: $phase,negomem: $negomem, transferedtonego: $transferedtonego, caseid: $caseid) {
    _id
  }
}
`;

export const  SEND_BACK = gql`
mutation sendBack($caseid: ID!, $phase: String!, $olduser: String!) {
  sendBack(caseid: $caseid, phase: $phase, olduser: $olduser) {
    _id
  }
}
`;
export const  NEGO_NEGO = gql`
mutation negotoNego($username: String!, $caseid: ID!, $olduser: String!, $transferedtonego: String!) {
  negotoNego(username: $username, caseid: $caseid, olduser: $olduser, transferedtonego: $transferedtonego) {
    _id
  }
}
`;
export const  CLEAN_ALL = gql`
mutation cleanAll {
  cleanAll
}
`;
export const  SEND_DEMANDMEMBER = gql`
mutation sendToDemandmember($caseid: ID!, $demandmem: String!) {
  sendToDemandmember(caseid: $caseid, demandmem: $demandmem) {
    _id
  }
}
`;