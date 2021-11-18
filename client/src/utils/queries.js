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
      fullname
      nb
      students {
        studentname
        userId
      }
      events {
        userId
        day
        start
        end
        student
        comment
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
      title
      about
      contacts
      fullname
      nb
      students {
        studentname
        userId
      }
      events {
        userId
        day
        start
        end
        student
        comment
      }
    }
  }
`;
