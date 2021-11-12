import gql from 'graphql-tag';


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      title
      about
      contacts
      
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      title
      about
      contacts
      
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      title
      about
      contacts
    }  
  }
`;