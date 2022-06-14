import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from '../../utils/queries';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import ActiveManagerCases from '../ActiveManagerCases'
import TransferManagerCases from '../TransferManagerCases'
import Auth from '../../utils/auth';
import { ALL_PREFS} from '../../utils/queries';
import Hero from '../Hero'
import {
    Button,
  
    Table

} from "react-bootstrap";
import Header from '../Header';

const Manager = props => {
    
    const [currentCategory, setCurrentCategory] = useState('Active');
    const [prefsState, setprefsState] = useState({    typesol: [],
        typecase: [],
        liability: [],
        levelinjury: [],
        phase: [],
        policy: [],
        level1: [],
        level2: [],
        level3: [],
        umbrella: [],
        umuim: [],
        lps: [],
        showactive: [],
        showtransfer: []});
  
    const { loading, data } = useQuery(ALL_PREFS, {
    });
    const prefs = data?.preferences || [];
    useEffect(() => {
        if (typeof prefs !== "undefined") {
           setprefsState({ 
            typesol: prefs.typesol,
            typecase: prefs.typecase,
            liability: prefs.liability,
            levelinjury: prefs.levelinjury,
            phase: prefs.phase,
            policy: prefs.policy,
            level1: prefs.level1,
            level2: prefs.level2,
            level3: prefs.level3,
            umbrella: prefs.umbrella,
            umuim: prefs.umuim,
            lps: prefs.lps,
            showactive: prefs.showactive,
            showtransfer: prefs.showtransfer});

        }
       
      }, [ data]);

    
   
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
        <button type="button" class={`mebtn ${currentCategory === 'Active' ? 'active' : ''}`} onClick={() => setCurrentCategory("Active")}>Active Cases</button>
        <button type="button" class={`mebtn ${currentCategory === 'Transfer' ? 'active' : ''}`} onClick={() => setCurrentCategory("Transfer")} >Transferred Case</button>
        <button type="button" class={`mebtn ${currentCategory === 'Add' ? 'active' : ''}`} onClick={() => setCurrentCategory("Add")} >Add Case</button>
     
      </div>

      {(currentCategory === "Active") ? <ActiveManagerCases /> : <>  </>}
      {(currentCategory === "Transfer") ? <TransferManagerCases /> : <>  </>}
      {(currentCategory === "Add") ? <Redirect to={{
    pathname: "/manager/casenew",
    state: { ...prefsState }
  }} /> :<> </>} 
      
    </section>

       

    );
};

export default Manager;