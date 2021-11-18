
import React, { useState } from 'react';
import {  QUERY_ME } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import StudentForm from '../../components/StudentForm';
import ShowTable from '../../components/ShowTable';
import { DELETE_STUDENT, ADD_EVENT} from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/react-hooks';

const Table = props => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [studentState, setStudent] = useState({ userId: "", studentname: '' });
  const [eventState, setEvent] = useState({ userId: props.user._id, day: "Monday", start: "", end: "", student: "", comment: "" });
  const [deleteStudent, { error }] = useMutation(DELETE_STUDENT);
  const [addEvent, { error2 }] = useMutation(ADD_EVENT);
  const { loading, data } = useQuery( QUERY_ME, {    
  });
  const user = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4 class="login-error">
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }
  const studentList = user?.students || [];

  const deleteStudentBtn = async event => {
    event.preventDefault();
    const newstudentname = event.target.getAttribute('data-student');
    console.log("newstudentname " + newstudentname);
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
    setStudent({
      userId: user._id, day: "Monday", start: "", end: "", student: "", comment: ""
    });
  }

  const handleChange = event => {
    const { name, value } = event.target;

    setEvent({
      ...eventState,
      [name]: value
    });
  };
  const addEventBtn = async event => {
    event.preventDefault();
    try {
    
      await addEvent({
        variables: { ...eventState }
      });
    } catch (e) {
      console.error(e);
    }
    setStudent({
      userID: '',
      studentname: ''
    });
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

              <div class="row info-list">
                <div class="col" >
                  <p > Time Start</p>
                  <input
                    name="start"
                    type="time"
                    id="start"
                    value={eventState.start}
                    onChange={handleChange} required />
                </div>
                <div class="col" >
                  <p >Time End</p>
                  <input      
                    name="end"
                    type="time"
                    id="end"
                    value={eventState.end}
                    onChange={handleChange} required />
                </div>
                <div class="col" >
                  <p >Day </p>
                  <select 
                   name="day"
                    type="text"
                    id="day"
                    value={eventState.day}
                    onChange={handleChange} required>
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
                  <select  
                  name="student"
                    type="text"
                    id="student"
                    value={eventState.student}
                    onChange={handleChange} required>
                    <option >-Choose student-</option>
                    {studentList.map(student => (
                      <option >{student.studentname}</option>
                    ))}
                  </select>
                </div>
                <div class="col" >
                  <p >Comment</p>
                  <input  name="comment"
                    type="text"
                    id="comment"
                    value={eventState.comment}
                    onChange={handleChange} />
                </div>
                <div class="col d-flex align-items-end"><button class="tablebtn" type="submit" onClick={addEventBtn} >
                  Add Event
                </button></div>

              </div>

              <section id="services" class="services section-bg">
    <div class="row">
  
    <ShowTable events={user.events} day="Monday" />
    <ShowTable events={user.events} day="Tuesday" />
    <ShowTable events={user.events} day="Wednesday" />
    <ShowTable events={user.events} day="Thurstday" />
    <ShowTable events={user.events} day="Friday" />
    <ShowTable events={user.events} day="Saturday" />
    <ShowTable events={user.events} day="Sunday" />
 
           

    </div>
    </section>
              




            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Table;
