import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from '../../utils/queries';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import DemandCases from '../DemandCases'
import TransferManagerCases from '../TransferManagerCases'
import Auth from '../../utils/auth';
import { ALL_PREFS} from '../../utils/queries';
import Hero from '../Hero'
import {
    Button,
  
    Table

} from "react-bootstrap";
import Header from '../Header';

const Demand = props => {
    
    const [currentCategory, setCurrentCategory] = useState('Demand');
   

    
   
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
        <button type="button" class={`mebtn ${currentCategory === 'Demand' ? 'active' : ''}`} onClick={() => setCurrentCategory("Demand")}>Demand</button>
        <button type="button" class={`mebtn ${currentCategory === 'Negotiation' ? 'active' : ''}`} onClick={() => setCurrentCategory("Negotiation")} >Litigation</button>
        <button type="button" class={`mebtn ${currentCategory === 'Litigaion' ? 'active' : ''}`} onClick={() => setCurrentCategory("Litigaion")} >Negotiation</button>
     
      </div>

      {(currentCategory === "Demand") ? <DemandCases /> : <>  </>}
      {(currentCategory === "Transfer") ? <TransferManagerCases /> : <>  </>}
      {(currentCategory === "Transfer") ? <TransferManagerCases /> : <>  </>}
  
      
    </section>

       

    );
};

export default Demand;