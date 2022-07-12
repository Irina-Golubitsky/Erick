import React, { useState } from 'react';
import  { Component } from 'react';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../../utils/mutations';
import { UPDATE_USER } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';

import Auth from '../../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../../utils/queries';
import {roles, departments} from "../arrays.js"


const EditUser = props => {
    const [userState, setuserState] = useState({ userId:"",username: "", email: "", role:"", department:"",active:false });

    const [addUser, { error }] = useMutation(ADD_USER);
    const [updateUser, { error2 }] = useMutation(UPDATE_USER);
    const { id: userId } = useParams();

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { id: userId }
    });

    useEffect(() => {
        if (typeof myuser !== "undefined") {
           setuserState({ userId:myuser._id,username: myuser.username, email: myuser.email, role:myuser.role, department:myuser.department,active:myuser.active });

        }
      }, [ data]);

    const myuser = data?.user || {};


    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `Hi times`;
    //   });
  console.log("after set state " + myuser);
    let un= myuser.username;

console.log(myuser);
    if (loading) {
        return <div>Loading...</div>;
    }
    const loggedIn = Auth.loggedIn();

    if (!loggedIn) {
        return (
            <h4 class="login-error">
                You need to be logged in to see this. Use the navigation links above to sign up or log in!
            </h4>
        );
    }
    const handleChange = event => {
        let { name, value } = event.target;
       
       
        if (name==="active"){

           setuserState({
          ...userState,
          [name]: document.getElementById("activeCheck").checked
        }); 
        } else{
    
        setuserState({
          ...userState,
          [name]: value
        });
      };}
   
         // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
       const newName=userState.username;
        const newEmail=userState.email;
        const newRole=userState.role;
       const newDepartment=userState.department;
        const newActive=userState.active;
        console.log(newName);

    
        try {
            console.log("try " + newName);
            await updateUser({
                variables: {...userState}
              });
              window.location.replace("/admin");
    

        } catch (e) {
            console.log("new mame: " + newName);
          console.error(e);
          
        }
      
      };
    //   componentDidMount(){
    //       console.log("hi");
    //      const [userState, setuserState] = useState({ userId:myuser._id,username: myuser.username, email: myuser.email, role:myuser.role, department:myuser.department,active:myuser.active });

    // };

    return (
        <section id="contact" class="contact">
        <div class="container" data-aos="fade-up">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8 col-sm-10 mt-0  d-flex   align-items-stretch">
                    <form  onSubmit={handleFormSubmit}class="php-email-form  ">
                    {(userId==='new') ? <h3 class="text-center">New User</h3> : <h3 class="text-center">Edit User</h3>}

                     <div class="form-group ">
                                <label >Username</label>
                                <input class="form-control" 
                                   name='username'
                                    type="text"
                                    id="xxx"
                                    value={userState.username}
                                    onChange={handleChange}
                                    // onChange={handleChange}
                                   required />
                            </div> 
                            <div class="form-group ">
                                <label >Email</label>
                                <input class="form-control" 
                                    name="email"
                                    type="string"
                                    id="myemail"
                                    value={userState.email}
                                    onChange={handleChange}
                                   required />
                            </div>
                            {/* <div class="form-group ">
                                <label for="mypassword">New Password</label>
                                <input class="form-control" 
                                    name="password"
                                    type="text"
                                    placeholder=''
                                    id="mypassword"
                                    onChange={handleChange}
                                     />
                           </div> */}

                            <div class="form-group">
                                <label >Role</label>
                                <select class="form-control"
                                    name="role"
                                    type="text"
                                    id="role"
                                    value={userState.role}
                                    onChange={handleChange}
                                    required>
                                    <option ></option>
                                     {roles.map(role => (
                      <option >{role}</option>
                    ))}
                                </select>

                            </div>
                            <div class="form-group">
                                <label >Department</label>
                                <select class="form-control"
                                    name="department"
                                    type="text"
                                    id="department"
                                    onChange={handleChange}
                                    // placeholder="Team 2"
                                    value={userState.department} >
                                    <option ></option>
                                    {departments.map(department => (
                                        <option >{department}</option>
                                    ))         
                                    }           
                                </select>

                            </div>
                            <div class="form-group">
                                <label >Active</label>
                                <input class="checkactive"
                                    name="active"
                                    type="checkbox"
                                    id="activeCheck"
                                   checked={userState.active} 
                                
                                   
                                   value={userState.active}
                                
                                    onChange={handleChange}
                                    // placeholder="Team 2"
                                    >
                                 
                                           
                                </input>

                            </div>
                           
                         
                        <div class="text-center"><button className="btn  w-50" type="submit">
                            Submit
                        </button></div>
                    </form>


                </div>

            </div>
        </div>
    </section>
    );
};

export default EditUser;
