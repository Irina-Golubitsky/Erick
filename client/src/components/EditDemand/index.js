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


const EditDemand = props => {
    const { id: caseId } = useParams();
    const [transstate,settransstate]=useState("");
    var date = new Date();
    var today = date.toISOString().split('T')[0];
    const [transCasestate,settransCasestate]=useState({phase: "",negomem:"", transferedtonego:today, caseid:caseId});
    const [readonlyState, setreadonlyState] = useState({
      
        username: "",
        transferedtodemand: "",
        demandmem:"",
        offerreceived: "",
        transferedtonego: "",
        negomem: "",
        transferedtoliti:"",
        litimem: ""
   
        

        });
    const [userState, setuserState] = useState({
        dol: "",
        
        fv: "",
        client: "",
      
      
        demandmem:"",
        dletter: "",
        phase: "",
        offerreceived: "",
    
        medicalbill: "",
        offer: "",
        tenderedpolicy:"",
        boicourttransfer:"",
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
            mydate=mydate.split("/");
            
            if (mydate[0].length===1){mydate[0]="0"+mydate[0]}
            if (mydate[1].length===1){mydate[1]="0"+mydate[1]}
            return mydate[2]+"-"+mydate[0]+"-"+mydate[1];

        }
        useEffect(() => {
            if (typeof data !== "undefined")  {
                console.log(data);

                setuserState({
                    dol: dateToInput(data.casedata.dol),
                    
                    fv: data.casedata.fv,
                    client: data.casedata.client,
                
                  
                    dletter: dateToInput(data.casedata.dletter),
                  
                    offerreceived: dateToInput(data.casedata.offerreceived),
            
                    medicalbill: data.casedata.medicalbill,
                    offer: data.casedata.offer,
                    tenderedpolicy:data.casedata.tenderedpolicy,
                    boicourttransfer:data.casedata.boicourttransfer,
                    negonotes: data.casedata.negonotes
                    });
                    setreadonlyState({
                     
                        username: data.casedata.username,
                    
                        transferedtodemand:dateToInput(data.casedata.transferedtodemand),
                        demandmem:data.casedata.demandmem,
              
                        transferedtonego: dateToInput(data.casedata.transferedtonego),
                        negomem: data.casedata.negomem,
                        transferedtoliti:dateToInput(data.casedata.transferedtoliti),
                        litimem: data.casedata.litimem
                      
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

              window.location.replace("/demand");
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
        {(caseId==='new') ? <h3 class="text-center">New Case</h3> : <h3 class="text-center">Edit Case # {caseId}</h3>}
            <div class="row">
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
                        <label for="form_name">Transfered to Demand Dept</label>
                        <input 
                        id="transferedtodemand"
                        type="date"
                        name="transferedtodemand" 
                        class="form-control"
                        value={readonlyState.transferedtodemand}
                        readonly="readonly"
                        required 
                        />
                    </div>
                </div>
        
                
            </div>
            <div class="row">
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">Demand Letter Sent</label>
                        <input 
                        id="dletter"
                        type="date"
                        name="dletter" 
                        class="form-control"
                        value={userState.dletter}
                        onChange={handleChange} 
                        required
                       
                        />
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">Offer Received Date</label>
                        <input 
                        id="offerreceived"
                        type="date"
                        name="offerreceived" 
                        class="form-control"
                        value={userState.offerreceived}
                        onChange={handleChange} 
                       
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
                        <label for="form_name">Negotiator Name</label>
                        <input 
                        id="negomem"
                        type="text"
                        name="negomem" 
                        class="form-control"
                        value={readonlyState.negomem}
                        readonly="readonly"
                        required >
                  
                        </input>
                    </div>
                </div>
               
                
            </div>
            <div class="row">
            <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">Transfered to Litigation</label>
                        <input 
                        id="transferedtoliti"
                        type="date"
                        name="transferedtoliti" 
                        class="form-control"
                        value={readonlyState.transferedtoliti}
                        readonly="readonly"
                       
                        />
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">Litigation Name</label>
                        <input
                        id="litimem"
                        type="text"
                        name="litimem" 
                        class="form-control"
                        value={readonlyState.litimem}
                        readonly="readonly"
                        required >
                  
                        </input>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">Initial Medical Bills</label>
                        <input 
                        id="medicalbill"
                        type="number"
                        name="medicalbill" 
                        class="form-control"
                        value={userState.medicalbill}
                        onChange={handleChange} >
                   
                        </input>
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
                        onChange={handleChange} >
             
             
                    </input>
                    </div>
                </div>
                
            </div>
            <div class="row">
                <div class="col-sm-3">
                <div class="form-group">
                        <label for="form_name">PL Tendered</label>
                        <select 
                        id="tenderedpolicy"
                        type="text"
                        name="tenderedpolicy" 
                        class="form-control"
                        value={userState.tenderedpolicy}
                        onChange={handleChange} >
                        <option></option>
                        {prefs.tenderedpolicy.map(role => (
                      <option >{role}</option>
                    ))}
                  
                        </select>
                    </div>
                </div>
                <div class="col-sm-3">
                <div class="form-group">
                        <label for="form_name">Boicourt</label>
                        <select 
                        id="boicourttransfer"
                        type="text"
                        name="boicourttransfer" 
                        class="form-control"
                        value={userState.boicourttransfer}
                        onChange={handleChange} >
                        <option></option>
                        {prefs.boicourttransfer.map(role => (
                      <option >{role}</option>
                    ))}
                  
                        </select>
                    </div>
                </div>
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

export default EditDemand;
