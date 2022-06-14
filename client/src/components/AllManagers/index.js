import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ACTIVEMANAGERS} from '../../utils/queries';
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

const AllManagers = props => {
    const [userState, setuserState] = useState({user:""});
    const [currentCategory, setCurrentCategory] = useState('active');
  

    const { loading, data } = useQuery(QUERY_ACTIVEMANAGERS, {
    });
    useEffect(() => {
        if (typeof data !== "undefined")  {
            console.log(data);

            setuserState({user:data.activemanagers[0]});}       
    }, [ data]);
    const users = data?.activemanagers || [];
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
    const UserClicked = (index) => (event) => {
        console.log("hi "+index);
        setuserState({user:data.activemanagers[index]}); 
        console.log(users[index].cases);
    }

    function renderListing() {
       let casedataList=[];
        let usercases=userState.user.cases||[];
        
        usercases.map(casedata => {

            if (casedata.show===currentCategory){
            casedataList.push(<tr >
        
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
                <td >{casedata.status}</td>
                <td >{casedata.level}</td>
                <td >{casedata.lastupdate}</td>
    
                
            </tr>);}
        })

        return casedataList;
    }
    

    return (


        <div id="info" class="section-bg">
            <div class="container-fluid" data-aos="fade-up">

              

                    <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">
                    <div class="content">
                    <h3>Active Managers</h3>
                    <div class="row">
                    {users.map((user, index)=> (
    <div class="col-3 userlist" onClick={UserClicked(index)}>{user.username}  </div>
                    ))}
       
                                                        
           
</div>
                    </div>
                
                </div>
                
                <div class=" d-flex justify-content-center">
        <button type="button" class={`mebtn ${currentCategory === 'active' ? 'active' : ''}`} onClick={() => setCurrentCategory("active")}>Active Cases</button>
        <button type="button" class={`mebtn ${currentCategory === 'transfer' ? 'active' : ''}`} onClick={() => setCurrentCategory("transfer")} >Transferred Case</button>
       
     
      </div>
      <div class="row">

<div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">
<div class="content tabscroll">
<h3>{userState.user.username}'s cases</h3>
<p></p>
<Table bordered hover className='bg-white tabscroll' size="sm">
                                        <thead>
                                            <tr>
                                            
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
                                                <th className="border-0 text-center">STATUS</th>
                                                <th className="border-0 text-center">level</th>
                                                <th className="border-0 text-center">lastupdate</th>

                                            </tr>
                                        </thead>
                                        <tbody className='tabscroll '>
                                        {renderListing()}
                                        </tbody>
                                    </Table>
                                    

</div>
</div>
</div>
               
            </div>
           
        </div>

    );
};

export default AllManagers;