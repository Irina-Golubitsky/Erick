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
export const QUERY_ME = gql`
  {
    me { 
      _id
      username
      email
      active
      role
      department
    }
  }
`;
