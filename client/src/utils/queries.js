import gql from 'graphql-tag';


export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
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
    me { _id
      username
      email
      title
      about
      contacts
    }
  }
`;
