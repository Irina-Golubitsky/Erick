import React, { useState } from 'react';
import  { Component } from 'react';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { QUERY_USERS} from '../../utils/queries';


import { useMutation,useQuery } from '@apollo/react-hooks';
import { ADD_CASEDATA} from '../../utils/mutations';

import { ALL_PREFS} from '../../utils/queries';
import { UPDATE_CASE} from '../../utils/mutations';
import { SEND_BACK} from '../../utils/mutations';

import { NEGO_NEGO } from '../../utils/mutations';
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
        medicalbill:null,
        offer:null,
        demandmem:"",
        negomem:"",
        nextcall:"",
   
        

        });
    const [userState, setuserState] = useState({
        dol: "",
        
        fv: "",
        client: "",
        phase: "",
        language:"",
        finaloffer:null,
        finalmedicalbill:null,
        feesper:null,
        feesmoney:null,
        lastcall:"",
        
        negostatus:"",
        negoclaim:"",
        umuim:"",
        med:"",
        outclient:"",
        outrandal:"",
       
        negonotes: "",
        phase:"",
        show:""
        

        });
       

       
        const prefs=props.location.state;

        const { loading, data } = useQuery(QUERY_CASE, {
            variables: { id: caseId }
        });
        const { loading:loading2, data:data2 } = useQuery(QUERY_USERS, {
        });
        const users = data2?.users || [];
      

        function dateToInput(mydate){
            if (mydate!==null){
            mydate=mydate.split("/");
            
            if (mydate[0].length===1){mydate[0]="0"+mydate[0]}
            if (mydate[1].length===1){mydate[1]="0"+mydate[1]}
            return mydate[2]+"-"+mydate[0]+"-"+mydate[1];
            }
            else return null;
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
                    finalmedicalbill:data.casedata.finalmedicalbill,
                    feesper:data.casedata.feesper,
                    feesmoney:data.casedata.feesmoney,
                    lastcall:dateToInput(data.casedata.lastcall),
                   
                    negostatus:data.casedata.negostatus,
                    negoclaim:data.casedata.negoclaim,
                    umuim:data.casedata.umuim,
                    med:data.casedata.med,
                    outclient:dateToInput(data.casedata.outclient),
                    outrandal:dateToInput(data.casedata.outrandal),
                   
                    negonotes: data.casedata.negonotes,
                    phase:data.casedata.phase,
                    show:data.casedata.show
                    });
                    setreadonlyState({
                     
                        username: data.casedata.username,
                    demandmem:data.casedata.demandmem,
                    negomem:data.casedata.negomem,
                        offer: data.casedata.offer,
        transferedtonego: dateToInput(data.casedata.transferedtonego),
        medicalbill:data.casedata.medicalbill
                      
                        });
                
                }       
        }, [ data]);



    const [addCase, { error }] = useMutation(ADD_CASEDATA);
    const [updateCase, { error2 }] = useMutation(UPDATE_CASE);

    const [negotoNego, { error3 }] = useMutation(NEGO_NEGO);
    const [sendBack, { error4 }] = useMutation(SEND_BACK);
    
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
        let { name, value } = event.target;
        if ((name==="finaloffer")||(name==="finalmedicalbill")||(name==="feesper")||(name==="feesmoney")){ value= Number(value)}
        
      
        
        
       
     
    
        setuserState({
          ...userState,
          [name]: value
        });
    
        // if ((name=="dol")||(name=="typesol")){SetSol()}
      };

      const handleTransferSubmit = async event => {
        event.preventDefault(); 
        
        try {        
            await negotoNego({
                variables: {username:transCasestate.negomem, caseid:caseId, olduser:readonlyState.negomem, transferedtonego:new Date(transCasestate.transferedtonego+"T00:00:00")}
              });

              window.location.replace("/nego");
        } catch (e) {
        }
      }

      const SendBack = async event => {
        event.preventDefault();
      

        try {        
            await sendBack({
                variables: {caseid:caseId, phase:userState.phase, olduser:readonlyState.negomem}
              });

              window.location.replace("/nego");
        } catch (e) {
        }

      
    };
 
   
         // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
        let phase = userState.phase;
        let show=userState.show;

        if ((userState.outrandal!==null)&(userState.outrandal!=="NaN-NaN-NaN")){
            phase="Storage";
            show="closed"
        }
        try {        
            await updateCase({
                variables: {...userState,caseId:caseId, dol:new Date(userState.dol+"T00:00:00"), lastcall:new Date(userState.lastcall+"T00:00:00"),outclient:new Date(userState.outclient+"T00:00:00"),outrandal:new Date(userState.outrandal+"T00:00:00"), phase:phase,show:show }
              });

               window.location.replace("/nego");
        } catch (e) {
        }

      
    };
    
       const SendBackfromStorage = async event => {
        event.preventDefault();
       
       
        try {        
            await updateCase({
                variables: {caseId:caseId, phase:"Negotiation", show:"active",outrandal:null}
              });

               window.location.replace("/nego");
        } catch (e) {
        }

      
    };
    const BackButton= event =>{
        event.preventDefault();
        window.location.replace("/nego");
    }
    function NextCall(mydate){
        if ((mydate!==null)&(mydate!=="")){
        mydate=mydate.split("-");
        
        

    let lastcall=new Date(parseInt(mydate[0]), parseInt(mydate[1])-1, parseInt(mydate[2])+14);
    lastcall=lastcall.toISOString().split('T')[0];
    lastcall=lastcall.split("-");


        return  lastcall[1]+'/'+ lastcall[2]+"/"+lastcall[0]
    //  return mydate[0]+"/"+mydate[1]+"/"+ mydate[2];
        }else {return ""}

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
                                       >

                                   
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
                                        step="0.01"
                                        name="offer"
                                        class="form-control"
                                        value={readonlyState.offer}
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
                                        step="0.01"
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
                                        step="0.01"
                                        name="medicalbill"
                                        class="form-control"
                                        value={readonlyState.medicalbill}
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
                                        step="0.01"
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
                                        step="0.01"
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
                                        step="0.01"
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
                                       
                                    />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="form_name">Next Call</label>
                                    <input
                                        id="nextcall"
                                        type="text"
                                        name="nextcall"
                                        class="form-control"
                                        value={NextCall(userState.lastcall)}
                                       
                                        readOnly
                                      
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
                                     onChange={handleChange}
                                   readOnly={ userState.phase === 'Storage' ? true : false }
                                      >

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

{ userState.phase === 'Negotiation' &&
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
}
<div class="clearfix"></div>
{ userState.phase === 'Storage' &&
        <button  class="btn btn-warning btn-send form-control" onClick={SendBackfromStorage}>Send back to Negotiation phase - {readonlyState.negomem}</button>
        }
        <div class="row">
            <div class="col-md-12">
                <br />
            </div>
        </div>
        <div class="clearfix"></div>
{ userState.phase === 'Negotiation' &&
        <button  class="btn btn-warning btn-send form-control" onClick={SendBack}>Send back to Demand - {readonlyState.demandmem}</button>
        }
        <div class="row">
            <div class="col-md-12">
                <br />
            </div>
        </div>
   

</div>
    
    </div>
    );
};

export default EditNego;
