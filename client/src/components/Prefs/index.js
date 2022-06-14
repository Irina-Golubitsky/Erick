import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_PREFS} from '../../utils/queries';
import { UPDATE_PREFS, CREATE_PREFS} from '../../utils/mutations';

import Auth from '../../utils/auth';

import {
    Button,
  
    Table

} from "react-bootstrap";


const Prefs = props => {
    const [userState, setuserState] = useState({    typesol: [],
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
    const [updatePrefs, { error }] = useMutation(UPDATE_PREFS);
    const [createPrefs, { error2 }] = useMutation(CREATE_PREFS);
   

    const { loading, data } = useQuery(ALL_PREFS, {
    });
    const prefs = data?.preferences || [];
 
    useEffect(() => {
        if (typeof prefs !== "undefined") {
           setuserState({ 
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
    
      if (loading) {
          return <div>Loading...</div>;
      }
      console.log(data);
    
   
    const loggedIn = Auth.loggedIn();

    if (!loggedIn) {
        return (
            <h4 class="login-error">
                You need to be logged in to see this. Use the navigation links above to sign up or log in!
            </h4>
        );
    }
    const handleChange = event => {
        const { name, value } = event.target;
       
       
    
        setuserState({
          ...userState,
          [name]: value.split(",")
        });
      ;}

      const handleFormSubmit = async event => {
        event.preventDefault();
        const {  name, value } = event.target;

        console.log(event.target);
        
        if (value==="create"){
            console.log('create');
            try {
                
                await createPrefs({
                    variables: {...userState}
                  });

        }
      catch (e) {
            
        console.error(e);
        
      }}else{
        try {
            
            await updatePrefs({
                variables: {...userState}
              });
             window.location.replace("/admin");
    

        } catch (e) {
            
          console.error(e);
          
        }}
      
      };
      
      
  

   
    return (

<div id="info" class="section-bg  " >
        <section id="contact" class="contact">
        <div class="container" data-aos="fade-up">
            <div class="row justify-content-center">
                <div class="col-lg-12 col-md-12 col-sm-12 mt-0  d-flex   align-items-stretch">
                    <div  onSubmit={handleFormSubmit} class="php-email-form  ">
                    <h3 class="text-center">Preferences</h3> 
                    <div class="form-group ">
                                    <label >Type of S.O.L</label>
                                    <input class="form-control"
                                        name='typesol'
                                        type="text"
                                        id="typesol"
                                        value={userState.typesol}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div>
                                <div class="form-group ">
                                    <label >Type of Case</label>
                                    <input class="form-control"
                                        name='typecase'
                                        type="text"
                                        id="typecase"
                                        value={userState.typecase}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >Liability</label>
                                    <input class="form-control"
                                        name='liability'
                                        type="text"
                                        id="liability"
                                        value={userState.liability}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >Level of injury</label>
                                    <input class="form-control"
                                        name='levelinjury'
                                        type="text"
                                        id="levelinjury"
                                        value={userState.levelinjury}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >Phase</label>
                                    <input class="form-control"
                                        name='phase'
                                        type="text"
                                        id="phase"
                                        value={userState.phase}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >Policy limits</label>
                                    <textarea rows="2" class="form-control"
                                        name='policy'
                                        type="text"
                                        id="policy"
                                        value={userState.policy}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >Level 1</label>
                                    <input class="form-control"
                                        name='level1'
                                        type="text"
                                        id="level1"
                                        value={userState.level1}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >Level 2</label>
                                    <input class="form-control"
                                        name='level2'
                                        type="text"
                                        id="level2"
                                        value={userState.level2}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >Level 3</label>
                                    <input class="form-control"
                                        name='level3'
                                        type="text"
                                        id="level3"
                                        value={userState.level3}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >Umbrella policy</label>
                                    <input class="form-control"
                                        name='umbrella'
                                        type="text"
                                        id="umbrella"
                                        value={userState.umbrella}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >UM/UIM</label>
                                    <textarea rows="2" class="form-control"
                                        name='umuim'
                                        type="text"
                                        id="umuim"
                                        value={userState.umuim}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >LPS</label>
                                    <input class="form-control"
                                        name='lps'
                                        type="text"
                                        id="lps"
                                        value={userState.lps}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >Show Active</label>
                                    <input class="form-control"
                                        name='showactive'
                                        type="text"
                                        id="showactive"
                                        value={userState.showactive}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                                <div class="form-group ">
                                    <label >Show Transfer</label>
                                    <input class="form-control"
                                        name='showtransfer'
                                        type="text"
                                        id="showtransfer"
                                        value={userState.showtransfer}
                                        onChange={handleChange}
                                    // onChange={handleChange}
                                    />
                                </div> 
                           
                           
                         
                        <div class="text-center"><button className="btn  w-50" type="submit" name="submit_button" value="update" onClick={handleFormSubmit}>
                            Update
                        </button></div>
                        {/* <div class="text-center"><button className="btn  w-50" type="submit"  name="submit_button" value="create" onClick={handleFormSubmit}>
                            Create
                        </button></div> */}
                       
                    </div>

                    
                </div>

            </div>
        </div>
    </section>
    </div>

    );
};

export default Prefs;