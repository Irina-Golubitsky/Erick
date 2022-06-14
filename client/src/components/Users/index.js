import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USERS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Auth from '../../utils/auth';

import Hero from '../Hero'
import {
    Button,
  
    Table

} from "react-bootstrap";
import Header from '../Header';
import Signup from '../Signup';

const Users = props => {
    const history = useHistory();

    const { loading, data } = useQuery(QUERY_USERS, {
    });
    const users = data?.users || [];
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
    const handleRowClick = (row) => {
        history.push(`/admin/user${row}`);
      }  

    function renderListing() {
        let recordList=[];
        users.map(record => {
            recordList.push(<tr onClick={()=> handleRowClick(record._id)} >
            <td > <Link
                to={`/admin/user${record._id}`}>     <button
                    className="tablebtn"
                    key={record.username}
                   >
                    ✓
                  </button></Link>
                </td>
                <td >{record.username}</td>
                <td >{record.email}</td>
                <td >{record.role}</td>
                <td >{record.department}</td>
                {record.active ? <td> ✓</td> : <td></td>}
                
            </tr>);
        })

        return recordList;
    }
    function AddUserButton(){

    }
    return (


        <div id="info" class="section-bg">
            <div class="container-fluid" data-aos="fade-up">

                <div class="row">

                    <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">
                    <div class="content">
                    <h3>Users</h3>
                    <p></p>
                    <Table bordered hover className='bg-white' size="sm">
                                                            <thead>
                                                                <tr>
                                                                <th class="checkwidth"></th>
                                                                    <th className="border-0 text-center one-line">Username</th>
                                                                    <th className="border-0 text-center">Email</th>
                                                                    <th className="border-0 text-center">Role</th>
                                                                    <th className="border-0 text-center">Department</th>
                                                                    <th className="border-0 text-center">Active</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {renderListing()}
                                                            </tbody>
                                                        </Table>
                                                       
                                                        <Signup ></Signup>
                                                        
           
</div>
                    </div>
                
                </div>
               
            </div>
           
        </div>

    );
};

export default Users;