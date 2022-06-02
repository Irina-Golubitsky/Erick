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
export const UPDATE_CASE = gql`
mutation updateCase($caseId:ID!,$dol: String, $sol: String, $typesol: String, $fv: String, $client: String, $passenger: String, $typecase: String, $liability: String, $levelinjury: String, $phase: String, $propertyd: String, $policy: String, $umbrella: String, $umuim: String, $med: String, $lps: String, $def: String, $status: String, $level: String,$show: String) {
  updateCase(caseId:$caseId, dol: $dol, sol: $sol, typesol: $typesol, fv: $fv, client: $client, passenger: $passenger, typecase: $typecase, liability: $liability, levelinjury: $levelinjury, phase: $phase, propertyd: $propertyd, policy: $policy, umbrella: $umbrella, umuim: $umuim, med: $med, lps: $lps, def: $def, status: $status, level: $level, show: $show) {
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
