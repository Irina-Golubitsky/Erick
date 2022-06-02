import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from '../../utils/queries';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import AllManagerCases from '../AllManagerCases'
import Auth from '../../utils/auth';
import Hero from '../Hero'
import {
    Button,
  
    Table

} from "react-bootstrap";
import Header from '../Header';

const Manager = props => {
    
    const [currentCategory, setCurrentCategory] = useState('All');

    
   
    const loggedIn = Auth.loggedIn();

    if (!loggedIn) {
        return (
            <h4 class="login-error">
                You need to be logged in to see this. Use the navigation links above to sign up or log in!
            </h4>
        );
    }
   
    
    return (




    <section class="why-us ">
      <div class=" d-flex justify-content-center">
        <button type="button" class={`mebtn ${currentCategory === 'All' ? 'active' : ''}`} onClick={() => setCurrentCategory("All")}>All Cases</button>
        <button type="button" class={`mebtn ${currentCategory === 'Add' ? 'active' : ''}`} onClick={() => setCurrentCategory("Add")} >Add Case</button>
     
      </div>

      {(currentCategory === "All") ? <AllManagerCases /> : <>  </>}
      {(currentCategory === "Add") ? <Redirect to="/manager/casenew" /> :<> </>} 
      
    </section>

       

    );
};

export default Manager;