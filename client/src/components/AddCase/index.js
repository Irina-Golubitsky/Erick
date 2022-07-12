import React, { useState } from 'react';
import  { Component } from 'react';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


import { useMutation,useQuery } from '@apollo/react-hooks';
import { ADD_CASEDATA} from '../../utils/mutations';
import { ALL_PREFS} from '../../utils/queries';
import { UPDATE_CASE} from '../../utils/mutations';
import { UPDATE_USER } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';


import Auth from '../../utils/auth';
import { QUERY_CASE} from '../../utils/queries';


const AddCase = props => {
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
        level:"",
        language:""
    });
       

        const { id: caseId } = useParams();
        const prefs=props.location.state;

        const { loading, data } = useQuery(QUERY_CASE, {
            variables: { id: caseId }
        });
      

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
                    sol: dateToInput(data.casedata.sol),
                    typesol:data.casedata.typesol,
                    fv: data.casedata.fv,
                    client: data.casedata.client,
                    passenger: data.casedata.passenger,
                    typecase: data.casedata.typecase,
                    liability:data.casedata.liability,
                    levelinjury:data.casedata.levelinjury,
                    phase: data.casedata.phase,
                    propertyd: data.casedata.propertyd,
                    policy: data.casedata.policy,
                    umbrella: data.casedata.umbrella,
                    umuim:data.casedata.umuim,
                    med:data.casedata.med,
                    lps:data.casedata.lps,
                    def:data.casedata.def,
                    status:data.casedata.status,
                    level:data.casedata.level,
                    language:data.casedata.language
                });}       
        }, [ data]);



    const [addCase, { error }] = useMutation(ADD_CASEDATA);
    const [updateCase, { error2 }] = useMutation(UPDATE_CASE);

    
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
        
      
        // if (((name=="dol")||(name=="typesol"))&((userState.dol!=="")&(userState.typesol!=="")))

       if ((name ==="dol")&(userState.typesol!=="")){
        let dateSol="";
        console.log(new Date(value) );
        console.log(new Date(value+"T00:00:00"));
        let dateDol=value.split("-");
        console.log(dateDol);
        if (userState.typesol==="1 year"){
        let newDate=new Date(parseInt(dateDol[0])+1, parseInt(dateDol[1])-1, parseInt(dateDol[2]));
         dateSol= newDate.toISOString().split('T')[0];}
        else if(userState.typesol==="2 years"){
            let newDate=new Date(parseInt(dateDol[0])+2, parseInt(dateDol[1])-1, parseInt(dateDol[2]));
             dateSol= newDate.toISOString().split('T')[0];
        }
        else if (userState.typesol==="6 months"){
            let newDate=new Date(parseInt(dateDol[0]), parseInt(dateDol[1])+5, parseInt(dateDol[2]));
             dateSol= newDate.toISOString().split('T')[0];
        }
        
        
        setuserState({
            ...userState,
            [name]: value,
            sol:dateSol
          });

       }else if((name ==="typesol")&(userState.dol!=="")){
        let dateSol="";
        let dateDol=userState.dol.split("-");
       ;
        if (value==="1 year"){
        let newDate=new Date(parseInt(dateDol[0])+1, parseInt(dateDol[1])-1, parseInt(dateDol[2]));
         dateSol= newDate.toISOString().split('T')[0];}
        else if(value==="2 years"){
            let newDate=new Date(parseInt(dateDol[0])+2, parseInt(dateDol[1])-1, parseInt(dateDol[2]));
             dateSol= newDate.toISOString().split('T')[0];
        }
        else if (value==="6 months"){
            let newDate=new Date(parseInt(dateDol[0]), parseInt(dateDol[1])+5, parseInt(dateDol[2]));
             dateSol= newDate.toISOString().split('T')[0];
        }
        
        
        setuserState({
            ...userState,
            [name]: value,
            sol:dateSol
          });

       }else if(name ==="policy"){
           let level="";
           if (prefs.level1.includes(value)){level="Level 1";} 
           else if
            (prefs.level2.includes(value)){level="Level 2";}  
            else if
            (prefs.level3.includes(value)){level="Level 3";}  
        setuserState({
            ...userState,
            [name]: value,
            level:level,
           
          });

       }


        else{
        
       
     
    
        setuserState({
          ...userState,
          [name]: value
        });
    }
        // if ((name=="dol")||(name=="typesol")){SetSol()}
      };
 
   
         // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
       let show="";
       if (prefs.showactive.includes(userState.phase)){show="active"}  else { show= "transfer"}
      
      
if (caseId==="new"){
    
        try {        
            await addCase({
                variables: {...userState,dol:new Date(userState.dol+"T00:00:00"), sol:new Date(userState.sol+"T00:00:00"), show:show}
              });
              window.location.replace("/manager");
        } catch (e) {
        }
      
      }
      else{
        console.log('update');
        console.log(userState);
        try {        
            await updateCase({
                variables: {...userState,caseId:caseId, dol:new Date(userState.dol+"T00:00:00"), sol:new Date(userState.sol+"T00:00:00"),show:show}
              });


             window.location.replace("/manager");
        } catch (e) {
        }

      }
    };
    const BackButton= event =>{
        event.preventDefault();
        window.location.replace("/manager");
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
                        <label for="form_name">Type of S.O.L.*</label>
                        <select 
                        id="typesol"
                        type="text"
                        name="typesol" 
                        class="form-control"
                        value={userState.typesol}
                        required
                        onChange={handleChange} >
                        <option ></option>
                                     {prefs.typesol.map(role => (
                      <option >{role}</option>
                    ))}
                        </select>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">Sol*</label>
                        <input 
                        id="sol"
                        type="date"
                        name="sol" 
                        class="form-control"
                        value={userState.sol}
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
                
            </div>
            <div class="row">
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">CLIENT'S NAME*</label>
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
                        <label for="form_name">PASSENGER'S NAME</label>
                        <input 
                        id="passenger"
                        type="text"
                        name="passenger" 
                        class="form-control"
                        value={userState.passenger}
                        onChange={handleChange} 
                       
                        />
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">TYPE OF CASE*</label>
                        <select 
                        id="typecase"
                        type="text"
                        name="typecase" 
                        class="form-control"
                        value={userState.typecase}
                        onChange={handleChange}
                        required >
                        <option ></option>
                                     {prefs.typecase.map(role => (
                      <option >{role}</option>
                    ))}
                        </select>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">LIABILITY* </label>
                        <select
                        id="liability"
                        type="text"
                        name="liability" 
                        class="form-control"
                        value={userState.liability}
                        onChange={handleChange} 
                        required
                        
                        >
                                  <option ></option>
                                     {prefs.liability.map(role => (
                      <option >{role}</option>
                    ))}
                    </select>
                    </div>
                </div>
                
            </div>
            <div class="row">
                <div class="col-sm-3">
                <div class="form-group">
                        <label for="form_name">LEVEL OF INJURY*</label>
                        <select 
                        id="levelinjury"
                        type="text"
                        name="levelinjury" 
                        class="form-control"
                        value={userState.levelinjury}
                        onChange={handleChange} 
                        required>
                        <option ></option>
                                     {prefs.levelinjury.map(role => (
                      <option >{role}</option>
                    ))}
                        </select>
                    </div>
                </div>
                <div class="col-sm-3">
                <div class="form-group">
                        <label for="form_name">PHASE*</label>
                        <select 
                        id="phase"
                        type="text"
                        name="phase" 
                        class="form-control"
                        value={userState.phase}
                        onChange={handleChange}
                        required >
                        <option ></option>
                                     {prefs.phase.map(role => (
                      <option >{role}</option>
                    ))}
                        </select>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">PROPERTY DAMAGE</label>
                        <input 
                        id="propertyd"
                        type="text"
                        name="propertyd" 
                        class="form-control"
                        value={userState.propertyd}
                        onChange={handleChange} >
                   
                        </input>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label for="form_name">POLICY LIMITS</label>
                        <select
                        id="policy"
                        type="text"
                        name="policy" 
                        class="form-control"
                        value={userState.policy}
                        onChange={handleChange} >
                                  <option ></option>
                                     {prefs.policy.map(role => (
                      <option >{role}</option>
                    ))}
                    </select>
                    </div>
                </div>
                
            </div>
            <div class="row">
                <div class="col-sm-3">
                <div class="form-group">
                        <label for="form_name">UMBRELLA POLICY</label>
                        <select 
                        id="umbrella"
                        type="text"
                        name="umbrella" 
                        class="form-control"
                        value={userState.umbrella}
                        onChange={handleChange} >
                        <option ></option>
                                     {prefs.umbrella.map(role => (
                      <option >{role}</option>
                    ))}
                        </select>
                    </div>
                </div>
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
                        <label for="form_name">LPS</label>
                        <select
                        id="lps"
                        type="text"
                        name="lps" 
                        class="form-control"
                        value={userState.lps}
                        onChange={handleChange} >
                                  <option ></option>
                                     {prefs.lps.map(role => (
                      <option >{role}</option>
                    ))}
                    </select>
                    </div>
                </div>
                
            </div>
            <div class="row">
                <div class="col-sm-3">
                <div class="form-group">
                        <label for="form_name">DEF INFO</label>
                        <input
                        id="def"
                        type="text"
                        name="def" 
                        class="form-control"
                        value={userState.def}
                        onChange={handleChange} >
                        </input>
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
                        onChange={handleChange} >
                                      <option ></option>
                                     {prefs.language.map(role => (
                      <option >{role}</option>
                    ))}
                   
                        </select>
                    </div>
                    </div>
                <div class="col-sm-6">
                <div class="form-group">
                        <label for="form_name">STATUS</label>
                        <input 
                        id="status"
                        type="text"
                        name="status" 
                        class="form-control"
                        value={userState.status}
                        onChange={handleChange} >
                   
                        </input>
                    </div>
                </div>
                <div class="col-sm-3">
      
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

</div>
    
    </div>
    );
};

export default AddCase;
