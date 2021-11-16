import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { UPDATE_USER } from '../../utils/mutations';
import {  useMutation } from '@apollo/react-hooks';
let SetForm=true;


const Table =props => {
    
    const [updateUser] = useMutation(UPDATE_USER);
  
    const { loading, data } = useQuery( QUERY_ME, {
       
      });
      const user = data?.me || {};
      if (loading) {
        return <div>Loading...</div>;
      }
      
      console.log ("my user timetable" + user);
      console.log ("my user timetable .title " + user.title);
    //  const [formState, setFormState] = useState({ title: user.title, about : user.about, contacts: user.contacts, fullname: user.fullname, nb: user.nb });

      if (!user?.username) {
        return (
          <h4 class="login-error">
            You need to be logged in to see this. Use the navigation links above to sign up or log in!
          </h4>
        );
      } 

    //  
  

   
 

      return (

        <div id="info" class="section-bg">
            <div class="container-fluid" data-aos="fade-up">

                <div class="row">

                    <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">

                        <div class="content">
                            <h3>My Students </h3>
                            <p>
                              
                            </p>
                        </div>

                        





                    </div>




                </div>
            </div>
        </div>

    );
};

export default Table;
