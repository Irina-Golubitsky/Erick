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
  mutation updateUser($title: String, $about: String, $contacts: String, $fullname: String, $nb: String) {
    updateUser( title: $title, about: $about, contacts: $contacts, fullname: $fullname, nb: $nb) {
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
        start
        end
        day
        student
        comment
      }
    }
  }
`;
export const ADD_STUDENT = gql`
  mutation addStudent($userId: ID!, $studentname: String!) {
    addStudent(userId: $userId, studentname: $studentname) {
      _id
      username
      students {
        studentname
        userId
      }
    }
  }
`;
export const DELETE_STUDENT = gql`
  mutation deleteStudent($userId: ID!, $studentname: String!) {
    deleteStudent(userId: $userId, studentname: $studentname) {
      _id
      username
      students {
        studentname
        userId
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($userId: ID!, $day: String! $start: String! $end: String! $student: String! $comment: String) {
    addEvent(userId: $userId, day: $day, start: $start, end: $end, student: $student, comment: $comment) {
      _id
      username
      events {
        start
        student
        day
      }
    }
  }
`;