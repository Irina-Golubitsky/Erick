
import React, { useState } from 'react';
import { UPDATE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import StudentForm from '../../components/StudentForm';
import { DELETE_STUDENT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Table = ({ user }) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [studentState, setStudent] = useState({ userID: "", studentname: '' });
  const [deleteStudent, { error }] = useMutation(DELETE_STUDENT);

  if (!Auth.loggedIn()) {
    return (
      <h4 class="login-error">
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }
  const studentList = user?.students || [];
  console.log(studentList);
  //  
  const deleteStudentBtn = async event => {
    event.preventDefault();
    const newstudentname = event.target.getAttribute('data-student');
    console.log("newstudentname " + newstudentname);
    setStudent({
      userID: user._id,
      studentname: newstudentname
    });
    try {
      console.log(studentState);
      await deleteStudent({
        variables: { ...studentState }
      });
    } catch (e) {
      console.error(e);
    }
    //   setStudent({
    //     userID: '',
    //     studentname: ''
    // });
  }

  return (

    <div id="info" class="section-bg">
      <div class="container-fluid" data-aos="fade-up">

        <div class="row">

          <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">

            <div class="content">
              <h3>My Students: </h3>
              {studentList.map(student => (
                <span class="">{student.studentname}<button className="tablebtn" key={student.studentname} data-student={student.studentname} onClick={deleteStudentBtn}>
                  ✗
                </button> &nbsp; </span>
              ))}
              <p>
              </p>
              <StudentForm userId={user._id} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Table;
