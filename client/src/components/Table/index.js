
import React, { useState } from 'react';
import { UPDATE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import StudentForm from '../../components/StudentForm';
import { DELETE_STUDENT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Table = ({ user }) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [studentState, setStudent] = useState({ userId: "", studentname: '' });
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
    // await setStudent({
    //   ...studentState,
    //   userId: user._id,
    //   studentname: newstudentname
    // });

    try {
      console.log(studentState);
      await deleteStudent({
        variables: {
          userId: user._id,
          studentname: newstudentname
        }
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

          <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">

            <div class="content">
              <h3>My Students: </h3>
              {studentList.map(student => (
                <span class="">{student.studentname}
                  <button
                    className="tablebtn"
                    key={student.studentname}
                    data-student={student.studentname}
                    onClick={deleteStudentBtn}>
                    ✗
                  </button> &nbsp; </span>
              ))}
              <p>
              </p>
              <StudentForm userId={user._id} />
              <br></br>
              <h3>New event: </h3>

              <div class="info-list">
                <div class="col" >
                  <p > Time Start</p>
                  <input type="time"  ></input>
                </div>
                <div class="col" >
                  <p >Time End</p>
                  <input type="time" ></input>
                </div>
                <div class="col" >
                  <p >Day </p>
                  <select id="" onchange="" >
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thurstday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
                </div>
                <div class="col" >
                  <p >Student</p>
                  <select id="myList" onchange="" >
                {studentList.map(student => (
                  <option >{student.studentname}</option>
                ))}
              </select>
                </div>
                <div class="col" >
                  <p >Comment</p>
                  <input type="text" ></input>
                </div>
                <div class="col d-flex align-items-end"><button class="tablebtn" type="submit"  >
                            Add Event
                        </button></div>

              </div>
  
            


            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Table;
