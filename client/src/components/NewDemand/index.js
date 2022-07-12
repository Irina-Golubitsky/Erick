import React, { useState, useEffect } from 'react';
import { useMutation,useQuery } from '@apollo/react-hooks';

import { QUERY_DEMANDUSERS} from '../../utils/queries';
import { ASSIGN_DEMAND} from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Auth from '../../utils/auth';

import Hero from '../Hero'
import {
    Button, 
    Table

} from "react-bootstrap";
import Header from '../Header';
import Signup from '../Signup';
import { event } from 'jquery';

const NewDemand = ({ cases })=> {
    
    const [selectState, setselectState] = useState({cases:[]});
    
    const [currentmanager, setCurrentManager] = useState('');
    const [currentCategory, setCurrentCategory] = useState('transfer');

    const { loading, data } = useQuery(QUERY_DEMANDUSERS, {
    });
    const [reassignCase, { error }] = useMutation(ASSIGN_DEMAND);
  ;
    const users = data?.demandusers || [];
    if (loading) {
        return <div>Loading...</div>;
    }
 
    
 
    const loggedIn = Auth.loggedIn();

    if (!loggedIn) {
        return (
            <h4 class="login-error">
                You need to be logged in to see this. Use the navigation links above to sign up or log in!
            </h4>
        );
    }

    const handleChangeManager = event => {
        const { name, value } = event.target;
        setCurrentManager(value);


    }
    const ReassignCases= event=> {
        event.preventDefault();
        console.log("hi reassign");
        selectState.cases.forEach(element => {console.log(element._id); ReassignCase(element._id)});
        window.location.replace("/admin");
        
    }
    const ReassignCase = async  (caseid) => {
        
      
    
        try {        
            await reassignCase({
                variables: {username:currentmanager, caseid:caseid}
              });
            //   
        } catch (e) {
        }
      
      }

        
    function toggleCaseSelected(casedata,event) {
        const { checked,name} = event.target;
        console.log(casedata);
        console.log(checked);
        let cases=selectState.cases;
        if (checked) {
         
            cases.push(casedata);
            console.log(cases);
            setselectState({cases:[...cases]});
        } else {
            cases = cases.filter(item => item !==casedata);
            console.log(cases);
            setselectState({cases:[...cases]});
        }
        
     console.log(name);
      }

      function renderListingReassign() {
        
        let casedataList=[];
         let usercases=selectState.cases||[];
         let i=1;
         
         usercases.map(casedata => {
 
            
             casedataList.push(<tr >
             <td></td>
      <td>{i}</td>
                 <td >{casedata.dol}</td>
                 <td >{casedata.sol}</td>
                <td >{casedata.typesol}</td>
                <td >{casedata.fv}</td>
                 <td >{casedata.client}</td>
                 <td >{casedata.passenger}</td>
                <td >{casedata.typecase}</td>
                 <td >{casedata.liability}</td>
                 <td >{casedata.levelinjury}</td>
                 <td >{casedata.phase}</td>
                <td >{casedata.propertyd}</td>
                 <td >{casedata.policy}</td>
 
                 <td >{casedata.umbrella}</td>
                 <td >{casedata.umuim}</td>
                <td >{casedata.med}</td>
                 <td >{casedata.lps}</td>
                 <td >{casedata.def}</td>
                 <td className='status'>{casedata.status}</td>
                 <td >{casedata.level}</td>
                 <td >{casedata.lastupdate}</td>
     
                 
             </tr>);i++;}
         )
 
         return casedataList;
     }
    function renderListing() {
        let i=1;
        
       let casedataList=[];
        let usercases=cases||[];
        
        usercases.map(casedata => {

            
            casedataList.push(<tr >
     <td><input type="checkbox" key={casedata._id} name={casedata.id} onChange={(event) => toggleCaseSelected(casedata, event)}  />&nbsp;</td>
     <td >{i}</td>
                <td >{casedata.dol}</td>
                <td >{casedata.sol}</td>
               <td >{casedata.typesol}</td>
               <td >{casedata.fv}</td>
                <td >{casedata.client}</td>
                <td >{casedata.passenger}</td>
               <td >{casedata.typecase}</td>
                <td >{casedata.liability}</td>
                <td >{casedata.levelinjury}</td>
                <td >{casedata.phase}</td>
               <td >{casedata.propertyd}</td>
                <td >{casedata.policy}</td>

                <td >{casedata.umbrella}</td>
                <td >{casedata.umuim}</td>
               <td >{casedata.med}</td>
                <td >{casedata.lps}</td>
                <td >{casedata.def}</td>
                <td className='status'>{casedata.status}</td>
                <td >{casedata.level}</td>
                <td >{casedata.lastupdate}</td>
    
                
            </tr>); i++;}
        )

        return casedataList;
    }
    

    return (


        <div id="info" class="section-bg">
            <div class="container-fluid" data-aos="fade-up">

              

                    <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">
                    <div class="content">
                    <h3>New Demand Cases</h3>
                    <div class="row">
        
       
                                                        
           
</div>
                    </div>
                
                </div>
                
                <div class=" d-flex justify-content-center">
        <button type="button" class={`mebtn ${currentCategory === 'reassign' ? 'active' : ''}`} onClick={() => setCurrentCategory("reassign")} >Assign to Demand Team Member</button>
     
      </div>
      <div class="row">

<div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">
<div class="content tabscroll">

{ currentCategory === 'reassign' &&
<div class="form-group">
                        <label for="form_name">Choose Demand Team Member</label>
                        <select 
                        id="typecase"
                        type="text"
                        name="typecase" 
                        class="form-control w-50"
                       
                        onChange={handleChangeManager}
                        required >
                        <option ></option>
                                     {users.map(user => (
                      <option >{user.username}</option>
                    ))}
                        </select> < br />
                        <div className='btn btn-success' onClick={ReassignCases} > Assign</div>
                    </div>
}
<Table bordered hover className='bg-white tabscroll' size="sm">
                                        <thead>
                                            <tr>
                                            <th className="border-0 text-center one-line"></th>
                                            <th className="border-0 text-center">N</th>
                                                <th className="border-0 text-center one-line">DOL</th>
                                                <th className="border-0 text-center">SOL</th>
                                                <th className="border-0 text-center">TYPE OF S.O.L.</th>
                                                <th className="border-0 text-center">FileVine #</th>
                                                <th className="border-0 text-center">CLIENT'S NAME</th>
                                                <th className="border-0 text-center ">PASSENGER'S NAME</th>
                                                <th className="border-0 text-center">TYPE OF CASE</th>
                                                <th className="border-0 text-center">LIABILITY</th>
                                                <th className="border-0 text-center">LEVEL OF INJURY</th>
                                                <th className="border-0 text-center">PHASE</th>

                                                <th className="border-0 text-center ">PROPERTY DAMAGE</th>
                                                <th className="border-0 text-center">POLICY LIMITS</th>
                                                <th className="border-0 text-center">UMBRELLA POLICY</th>
                                                <th className="border-0 text-center">UM/UIM</th>
                                                <th className="border-0 text-center">MED PAY</th>
                                                <th className="border-0 text-center">LPS</th>
                                                <th className="border-0 text-center">DEF INFO</th>
                                                <th className="border-0 text-center status">STATUS</th>
                                                <th className="border-0 text-center">level</th>
                                                <th className="border-0 text-center">lastupdate</th>

                                            </tr>
                                        </thead>
                                        <tbody className='tabscroll '>
                                        { currentCategory !== 'reassign' && renderListing()}
                                        { currentCategory === 'reassign' && renderListingReassign()}
                                        
                                        </tbody>
                                    </Table>
                                    

</div>
</div>
</div>
               
            </div>
           
        </div>

    );
};

export default NewDemand;