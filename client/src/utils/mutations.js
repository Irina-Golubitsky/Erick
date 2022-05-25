import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
