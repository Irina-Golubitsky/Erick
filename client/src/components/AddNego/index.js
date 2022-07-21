import React, { useState,useRef } from 'react';



import { useMutation } from '@apollo/react-hooks';
import { ADD_NEGO} from '../../utils/mutations';
import { UPDATE_CASE} from '../../utils/mutations';
import { CLEAN_ALL } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';
import {showactive,showtransfer,level1,level2,level3} from "../arrays.js"


import Auth from '../../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CASE} from '../../utils/queries';
let min=10;
let max=100000; 
let i =
Math.floor(Math.random() * (+max + 1 - +min)) + +min;


const AddNego= props => {
    const mytextarea = useRef(null);
    const [textState,settextState]=useState("");
   



    const [addNego, { error }] = useMutation(ADD_NEGO);
    
    
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
  array.pop();
    // array=array.split(/\r?\n/);
   
  console.log(array);
    array.map( (element) => {
        let newcase=element.split("\t");
        console.log(newcase);
       addNewCase(newcase);
    })
};

const addNewCase = async (newcase) => {
    let transferedtonego=newcase[6];
    if(newcase[7]!==""){ transferedtonego=newcase[7]}
    if (newcase[3]===""){newcase[3]="nego error#"+i;i++}
   
        try {        
            await addNego({
                variables: {negomem:newcase[0],username:newcase[1],client: newcase[2],fv: newcase[3],  language:newcase[4],dol: newcase[5], 
                   transferedtonego:transferedtonego, offer:Number(newcase[8]),finaloffer: Number(newcase[9]), medicalbill: Number(newcase[10]), finalmedicalbill: Number(newcase[11]),
                   feesper:Number(newcase[12])*100, feesmoney:Number(newcase[13]), lastcall: newcase[15],
                     negostatus:newcase[17], negoclaim:newcase[18],umuim:newcase[19],med:newcase[20],negonotes:newcase[21],outclient:newcase[22],outrandal:newcase[23]
                     }
              });

             
        } catch (e) { console.log(newcase[0] + " "+newcase[1] )
        }

}



    return (
        <div id="info" class="section-bg-full  " >
        
    <div class="container">
    <h1>Add Nego</h1>
    <form onSubmit={handleFormSubmit}>
    <textarea id="textarea" ref={mytextarea} onChange= {handleChange} class="w-100" rows="30" >

</textarea>
  <input type="submit" value="Submit" />
</form>
  

</div>
    
    </div>
    );
};

export default AddNego;
