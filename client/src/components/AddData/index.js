import React, { useState,useRef } from 'react';
import  { Component } from 'react';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


import { useMutation } from '@apollo/react-hooks';
import { ADD_ALLDATA} from '../../utils/mutations';
import { UPDATE_CASE} from '../../utils/mutations';
import { CLEAN_ALL } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';
import {showactive,showtransfer,level1,level2,level3} from "../arrays.js"


import Auth from '../../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CASE} from '../../utils/queries';


const AddData = props => {
    const mytextarea = useRef(null);
    const [textState,settextState]=useState("");
    const [userState, setuserState] = useState({
        dol: "",
        sol: "",
        typesol: "",
        fv: "",
        client: "",
        passenger: "",
        typecase: "",
        liability: "",
        levelinjury: "",
        phase: "",
        propertyd: "",
        policy: "",
        umbrella: "",
        umuim:"",
        med:"",
        lps:"",
        def:"",
        status:"",
        level:""});



    const [addData, { error }] = useMutation(ADD_ALLDATA);
    const [cleanAll, { error2 }] = useMutation(CLEAN_ALL);
    
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
       settextState(value);
      };
 
   
         // submit form

const handleFormSubmit = async event => {
    event.preventDefault();
    let array=textState.replace(/['"]+/g, '')
    console.log(array);
    array=array.split("endofline");
    // array=array.split(/\r?\n/);
  console.log(array);
    array.map( (element) => {
        let newcase=element.split("\t");
        console.log(newcase);
       addNewCase(newcase);
    })
};
function dateToInput(mydate){
    mydate=mydate.split("/");
    
    if (mydate[0].length===1){mydate[0]="0"+mydate[0]}
    if (mydate[1].length===1){mydate[1]="0"+mydate[1]}
    return mydate[2]+"-"+mydate[0]+"-"+mydate[1];

}
const addNewCase = async (newcase) => {
    let show="";
        if (showtransfer.includes(newcase[10])){show="transfer"}  else { show= "active"}
        let level="";
        if (level1.includes(newcase[12])){level="Level 1";} 
        else if
         (level2.includes(newcase[12])){level="Level 2";}  
         else if
         (level3.includes(newcase[12])){level="Level 3";}  
        //  let dol=new Date(dateToInput(newcase[1])+"T00:00:00");
        //  console.log("dol " +dol);
        //  let sol=new Date(dateToInput(newcase[2])+"T00:00:00");
        try {        
            await addData({
                variables: {username: newcase[0],dol: newcase[1], sol: newcase[2], typesol: newcase[3], fv: newcase[4],
                     client: newcase[5], passenger: newcase[6], typecase: newcase[7], liability: newcase[8], levelinjury: newcase[9],
                      phase: newcase[10], propertyd: newcase[11], policy: newcase[12], umbrella: newcase[13], umuim: newcase[14],
                       med: newcase[15], lps: newcase[16], def: newcase[17], status: newcase[18], level: level,show: show}
              });

             
        } catch (e) { console.log(newcase[0] + " "+newcase[1] )
        }

}
const cleanAllCases = async event => {
    event.preventDefault();
    try {        
        await cleanAll();
        console.log("cleaned");

         
    } catch (e) { console.log("error" )
    }


}


    return (
        <div id="info" class="section-bg-full  " >
        
    <div class="container">
    <form onSubmit={handleFormSubmit}>
    <textarea id="textarea" ref={mytextarea} onChange= {handleChange} class="w-100" rows="30" >

</textarea>
  <input type="submit" value="Submit" />
</form>
   <button onClick={cleanAllCases} >Clean All</button>

</div>
    
    </div>
    );
};

export default AddData;
