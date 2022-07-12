import React, { useState } from 'react';
import  { Component } from 'react';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { QUERY_USERS} from '../../utils/queries';


import { useMutation,useQuery } from '@apollo/react-hooks';
import { ADD_CASEDATA} from '../../utils/mutations';

import { ALL_PREFS} from '../../utils/queries';
import { UPDATE_CASE} from '../../utils/mutations';
import { TRANSFER_NEGO } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';


import Auth from '../../utils/auth';
import { QUERY_CASE} from '../../utils/queries';


const EditNego = props => {
    const { id: caseId } = useParams();
    const [transstate,settransstate]=useState("");
    var date = new Date();
    var today = date.toISOString().split('T')[0];
    const [transCasestate,settransCasestate]=useState({phase: "",negomem:"", transferedtonego:today, caseid:caseId});
    const [readonlyState, setreadonlyState] = useState({
      
        username: "",
        offer: "",
        transferedtonego: "",
        medicalbill:""
   
        

        });
    const [userState, setuserState] = useState({
        dol: "",
        
        fv: "",
        client: "",
        phase: "",
        language:"",
        finaloffer:"",
        feesper:"",
        feesmoney:"",
        lastcall:"",
        nextcall:"",
        negostatus:"",
        negoclaim:"",
        umuim:"",
        med:"",
        outclient:"",
        outrandal:"",
       
        negonotes: ""
        

        });
       

       
        const prefs=props.location.state;

        const { loading, data } = useQuery(QUERY_CASE, {
            variables: { id: caseId }
        });
        const { loading:loading2, data:data2 } = useQuery(QUERY_USERS, {
        });
        const users = data2?.users || [];
      

        function dateToInput(mydate){
            if (typeof mydate!=="undefined"){
            mydate=mydate.split("/");
            
            if (mydate[0].length===1){mydate[0]="0"+mydate[0]}
            if (mydate[1].length===1){mydate[1]="0"+mydate[1]}
            return mydate[2]+"-"+mydate[0]+"-"+mydate[1];
            }

        }
        useEffect(() => {
            if (typeof data !== "undefined")  {
                console.log(data);

                setuserState({
                    dol: dateToInput(data.casedata.dol),
                    
                    fv: data.casedata.dol,
                    client: data.casedata.client,
                    phase: data.casedata.phase,
                    language:data.casedata.language,
                    finaloffer:data.casedata.finaloffer,
                    feesper:data.casedata.feesper,
                    feesmoney:data.casedata.feesmoney,
                    lastcall:dateToInput(data.casedata.lastcall),
                    nextcall:dateToInput(data.casedata.nextcall),
                    negostatus:data.casedata.negostatus,
                    negoclaim:data.casedata.negoclaim,
                    umuim:data.casedata.umuim,
                    med:data.casedata.med,
                    outclient:data.casedata.outclient,
                    outrandal:data.casedata.outrandal,
                   
                    negonotes: data.casedata.negonotes
                    });
                    setreadonlyState({
                     
                        username: data.casedata.username,
                    
                        offer: data.casedata.offer,
        transferedtonego: dateToInput(data.casedata.transferedtonego),
        medicalbill:data.casedata.medicalbill
                      
                        });
                
                }       
        }, [ data]);



    const [addCase, { error }] = useMutation(ADD_CASEDATA);
    const [updateCase, { error2 }] = useMutation(UPDATE_CASE);

    const [transferNego, { error3 }] = useMutation(TRANSFER_NEGO);
    
    const loggedIn = Auth.loggedIn();

    if (!loggedIn) {
        return (
            <h4 class="login-error">
                You need to be logged in to see this. Use the navigation links above to sign up or log in!
            </h4>
        );
    }

    const handleChangeTrans = event => {
        const { name, value } = event.target;
        settransstate(value);
    }
    const handleChangeTransCase = event => {
        const { name, value } = event.target;
        settransCasestate({
            ...transCasestate,
            [name]: value
          });
    }
    
    const handleChange = event => {
        const { name, value } = event.target;
        
      
        
        
       
     
    
        setuserState({
          ...userState,
          [name]: value
        });
    
        // if ((name=="dol")||(name=="typesol")){SetSol()}
      };

      const handleTransferSubmit = async event => {
        event.preventDefault(); 
        console.log("nego");
        try {        
            await transferNego({
                variables: {...transCasestate, transferedtonego:new Date(transCasestate.transferedtonego+"T00:00:00")}
              });

              window.location.replace("/nego");
        } catch (e) {
        }
      }
 
   
         // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
      
      
      

        try {        
            await updateCase({
                variables: {...userState,caseId:caseId, dol:new Date(userState.dol+"T00:00:00"),dletter:new Date(userState.dletter+"T00:00:00"), offerreceived:new Date(userState.offerreceived+"T00:00:00")}
              });

              window.location.replace("/demand");
        } catch (e) {
        }

      
    };
    const BackButton= event =>{
        event.preventDefault();
        window.location.replace("/demand");
    }
 

    return (
        <div id="info" class="section-bg-full  " >
        
    <div class="container">
    <button class="mebtn2" onClick={BackButton}>	🔙</button>
                <form id="contact-form" onSubmit={handleFormSubmit}>
                    <div class="messages"></div>
                    <div class="controls">
                        {(caseId === 'new') ? <h3 class="text-center">New Case</h3> : <h3 class="text-center">Edit Case # {caseId}</h3>}
                        <div class="row">
                        <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Case Manager</label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        class="form-control"
                                        value={readonlyState.username}
                                        readonly="readonly" >

                                    </input>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Case Name*</label>
                                    <input
                                        id="client"
                                        type="text"
                                        name="client"
                                        class="form-control"
                                        value={userState.client}
                                        onChange={handleChange}
                                        required

                                    />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">FileVine #*</label>
                                    <input
                                        id="fv"
                                        type="text"
                                        name="fv"
                                        class="form-control"
                                        value={userState.fv}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Language</label>
                                    <select
                                        id="language"
                                        type="text"
                                        name="language"
                                        class="form-control"
                                        value={userState.language}
                                        onChange={handleChange}
                                        required >

                                   
                                        <option></option>
                                        {prefs.language.map(role => (
                                            <option >{role}</option>
                                        ))}
                                        </select>
                                </div>
                            </div>
                            


                        </div>
                        <div class="row">
                        <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Dol*</label>
                                    <input
                                        id="dol"
                                        type="date"
                                        name="dol"
                                        class="form-control"
                                        value={userState.dol}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                         
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Transfered to Negotiation</label>
                                    <input
                                        id="transferedtonego"
                                        type="date"
                                        name="transferedtonego"
                                        class="form-control"
                                        value={readonlyState.transferedtonego}
                                        readonly="readonly"

                                    />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Initial Offer</label>
                                    <input
                                        id="offer"
                                        type="number"
                                        name="offer"
                                        class="form-control"
                                        value={userState.offer}
                                        readonly="readonly" >


                                    </input>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Final Offer</label>
                                    <input
                                        id="finaloffer"
                                        type="number"
                                        name="finaloffer"
                                        class="form-control"
                                        value={userState.finaloffer}
                                        onChange={handleChange} >


                                    </input>
                                </div>
                            </div>
                         


                        </div>
                        <div class="row">
                         
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Initial Medical Bills</label>
                                    <input
                                        id="medicalbill"
                                        type="number"
                                        name="medicalbill"
                                        class="form-control"
                                        value={userState.medicalbill}
                                        readonly="readonly" >

                                    </input>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Final Medical Bills</label>
                                    <input
                                        id="finalmedicalbill"
                                        type="number"
                                        name="finalmedicalbill"
                                        class="form-control"
                                        value={userState.finalmedicalbill}
                                        onChange={handleChange} >

                                    </input>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Attorney Fees in %</label>
                                    <input
                                        id="feesper"
                                        type="number"
                                        name="feesper"
                                        class="form-control"
                                        value={userState.feesper}
                                        onChange={handleChange} >

                                    </input>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Attorney Fees in $</label>
                                    <input
                                        id="feesmoney"
                                        type="number"
                                        name="feesmoney"
                                        class="form-control"
                                        value={userState.feesmoney}
                                        onChange={handleChange} >

                                    </input>
                                </div>
                            </div>
               

                        </div>

                        <div class="row">
                        <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Last Call</label>
                                    <input
                                        id="lastcall"
                                        type="date"
                                        name="lastcall"
                                        class="form-control"
                                        value={userState.lastcall}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Next Call</label>
                                    <input
                                        id="nextcall"
                                        type="date"
                                        name="nextcall"
                                        class="form-control"
                                        value={userState.nextcall}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Status</label>
                                    <select
                                        id="negostatus"
                                        type="text"
                                        name="negostatus"
                                        class="form-control"
                                        value={userState.negostatus}
                                        onChange={handleChange} >
                                        <option></option>
                                        {prefs.negostatus.map(role => (
                                            <option >{role}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Claim Negotiator</label>
                                    <select
                                        id="negoclaim"
                                        type="text"
                                        name="negoclaim"
                                        class="form-control"
                                        value={userState.negoclaim}
                                        onChange={handleChange} >
                                        <option></option>
                                        {prefs.negoclaim.map(role => (
                                            <option >{role}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                           


                        </div>
                        <div class="row">
                        <div class="col-sm-3">
                <div class="form-group">
                        <label for="form_name">UM/UIM</label>
                        <select 
                        id="umuim"
                        type="text"
                        name="umuim" 
                        class="form-control"
                        value={userState.umuim}
                        onChange={handleChange} >
                        <option ></option>
                                     {prefs.umuim.map(role => (
                      <option >{role}</option>
                    ))}
                        </select>
                    </div>
                </div>
                         
                        <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">MED PAY</label>
                        <input 
                        id="med"
                        type="text"
                        name="med" 
                        class="form-control"
                        value={userState.med}
                        onChange={handleChange} >
                   
                        </input>
                    </div>
                </div>
                         <div class="col-sm-3">
                             <div class="form-group">
                                 <label for="form_name">Out To client</label>
                                 <input
                                     id="outclient"
                                     type="date"
                                     name="outclient"
                                     class="form-control"
                                     value={userState.outclient}
                                     onChange={handleChange} >

                                 </input>
                             </div>
                         </div>
                         <div class="col-sm-3">
                             <div class="form-group">
                                 <label for="form_name">Out To Randal</label>
                                 <input
                                     id="outrandal"
                                     type="date"
                                     name="outrandal"
                                     class="form-control"
                                     value={userState.outrandal}
                                     onChange={handleChange} >

                                 </input>
                             </div>
                         </div>
                       
            

                     </div>
                        <div class="row">

                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="form_name">Notes</label>
                                    <input
                                        id="negonotes"
                                        type="text"
                                        name="negonotes"
                                        class="form-control"
                                        value={userState.negonotes}
                                        onChange={handleChange} >

                                    </input>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="row">


                        <div class="col-md-3" align="center">
                        
                                <div class="form-group">
                                    <label for="form_name">Phase</label>
                                    <select
                                        id="phase"
                                        type="text"
                                        name="phase"
                                        class="form-control"
                                        value={userState.phase}
                                        onChange={handleChange} >
                                        <option>Negotiation</option>
                                        <option>Storage</option>

                                    </select>
                                </div>
                           
                        </div>
                    </div>
                    <div class="clearfix"></div>

                    <div class="row">


                        <div class="col-md-12" align="center">
                            <input type="submit" class="btn btn-warning btn-send" value="Save Changes" />
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-12">
                            <p class="text-muted"><strong>*</strong> These fields are required.</p>
                        </div>
                    </div>

                </form>

    <form id="contact-form" onSubmit={handleTransferSubmit}>
     <h3 class="text-center">Transfer Case </h3>

        <div class="messages"></div>
        <div class="controls">
            <div class="row">
            <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">Department *</label>
                        <select 
                        id="phase"
                        type="text"
                        name="phase" 
                        class="form-control"
                        value={transCasestate.phase}
                        required
                        onChange={handleChangeTransCase} >
                        <option></option>
                     <option>Negotiation</option>
                     <option>Litigation</option>
                     <option>Demand</option>
                  
                        </select>
                        
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">Team Member *</label>
                        <select 
                        id="negomem"
                        type="text"
                        name="negomem" 
                        class="form-control"
                        value={transCasestate.negomem}
                        onChange={handleChangeTransCase} 
                        required>
                            <option ></option>
                            {users.filter(user => user.role===transCasestate.phase).map(user => (
    <option>
      {user.username}
    </option>
  ))}
                      
                    </select>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">Date Sent *</label>
                        <input 
                        id="transferedtonego"
                        type="date"
                        name="transferedtonego" 
                        class="form-control"
                        value={transCasestate.transferedtonego}
                        onChange={handleChangeTransCase} 
                        required
                        />
                    </div>
                </div>
          
               
                
            </div>
        </div>
        <div class="clearfix"></div>

        <div class="row">
       
         
            <div class="col-md-12" align="center">
                <input type="submit" class="btn btn-warning btn-send" value="Transfer Case" />
            </div>
        </div>

        
        <div class="row">
            <div class="col-md-12">
                <p class="text-muted"><strong>*</strong> These fields are required.</p>
            </div>
        </div>
        </form>
  
   

</div>
    
    </div>
    );
};

export default EditNego;
