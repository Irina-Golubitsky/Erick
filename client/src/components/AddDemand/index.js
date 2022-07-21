import React, { useState,useRef } from 'react';



import { useMutation } from '@apollo/react-hooks';
import { ADD_DEMAND} from '../../utils/mutations';
import { UPDATE_CASE} from '../../utils/mutations';
import { CLEAN_ALL } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';
import {showactive,showtransfer,level1,level2,level3} from "../arrays.js"


import Auth from '../../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CASE} from '../../utils/queries';
let i=1;


const AddDemand = props => {
    const mytextarea = useRef(null);
    const [textState,settextState]=useState("");
   



    const [addDemand, { error }] = useMutation(ADD_DEMAND);
    
    
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
    if (newcase[1]===""){newcase[1]="sandra error#"+i;i++}
   
        try {        
            await addDemand({
                variables: {client: newcase[0],fv: newcase[1], dol: newcase[2], 
                    transferedtodemand:newcase[3],dletter:newcase[4],offerreceived: newcase[5], transferedtonego:newcase[6], negomem: newcase[7],
                    medicalbill: Number(newcase[10]),offer:Number(newcase[11]), tenderedpolicy:newcase[12],boicourttransfer:newcase[13], username:newcase[14],negonotes:newcase[15]
                     }
              });

             
        } catch (e) { console.log(newcase[0] + " "+newcase[1] )
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
  

</div>
    
    </div>
    );
};

export default AddDemand;
