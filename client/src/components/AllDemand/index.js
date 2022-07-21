import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from '../../utils/queries';
import { ALL_PREFS } from '../../utils/queries';
import { QUERY_GETUSERSBYROLE } from '../../utils/queries';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Auth from '../../utils/auth';
import Hero from '../Hero'
import {
    Button,
  
    Table

} from "react-bootstrap";
import Header from '../Header';

const AllDemand = props => {
    const history = useHistory();
    const [userState, setuserState] = useState({user:""});
    const [currentmanager, setCurrentManager] = useState('');
  
    const [currentCategory, setCurrentCategory] = useState('Demand');

    const { loading, data } = useQuery(QUERY_GETUSERSBYROLE, {
        variables: { role: "Demand" }
    });
   
    useEffect(() => {
        if (typeof data !== "undefined") {
            

            setuserState({ user: data.getusersbyrole[0] });
        }
    }, [data]);
   
  

    if (loading) {
      return <div>Loading...</div>;
    }
    const users = data?.getusersbyrole || {};
   
    const loggedIn = Auth.loggedIn();

    if (!loggedIn) {
        return (
            <h4 class="login-error">
                You need to be logged in to see this. Use the navigation links above to sign up or log in!
            </h4>
        );
    }

     const UserClicked = (index) => (event) => {
        
        setuserState({user:data.getusersbyrole[index]}); 
        console.log(users[index].cases);
    }
    const handleChangeManager = event => {
        const { name, value } = event.target;
        setCurrentManager(value);


    }

    //   onClick={()=> handleRowClick(casedata._id)} 
   function renderListing() {
        let casedataList=[];
        let i=0;
        let usercases=userState.user.cases||[];
        console.log(usercases);
        usercases.map(casedata => {

            if (casedata.phase===currentCategory){  i++;
            casedataList.push(<tr >
            
                <td>{i}</td>
                <td >{casedata.client}</td>
                <td >{casedata.fv}</td>
               <td >{casedata.dol}</td>
   
               <td >{casedata.transferedtodemand}</td>
               {casedata.dletter != "NaN/NaN/NaN" ? <td>{casedata.dletter}</td> : <td></td>}
               {casedata.offerreceived != "NaN/NaN/NaN" ? <td>{casedata.offerreceived}</td> : <td></td>}
               {casedata.transferedtonego != "NaN/NaN/NaN" ? <td>{casedata.transferedtonego}</td> : <td></td>}
          
                <td >{casedata.negomem}</td>
                {casedata.transferedtoliti != "NaN/NaN/NaN" ? <td>{casedata.transferedtoliti}</td> : <td></td>}

                <td >{casedata.litimem}</td>
                {casedata.medicalbill != "NaN" ? <td>${casedata.medicalbill}</td> : <td></td>}
                {casedata.offer != "NaN" ? <td>${casedata.offer}</td> : <td></td>}
               
               

                <td >{casedata.tenderedpolicy}</td>
                <td >{casedata.boicourttransfer}</td>
                <td >{casedata.username}</td>
                <td >{casedata.negonotes}</td>
                <td >{casedata.lastupdate}</td>
              
    
                
            </tr>);}}
        )

        return casedataList;
    }
    return (

<div id="info" class="section-bg">
            <div class="container-fluid" data-aos="fade-up">



                <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">
                    <div class="content">
                        <h3>Demand Members</h3>
                        <div class="row">
                            {users.map((user, index) => (
                                <div class="col-3 userlist" onClick={UserClicked(index)}>{user.username}  </div>
                            ))}



                        </div>
                    </div>

                </div>

                <div class=" d-flex justify-content-center">
        <button type="button" class={`mebtn ${currentCategory === 'Demand' ? 'active' : ''}`} onClick={() => setCurrentCategory("Demand")}>Demand</button>
        <button type="button" class={`mebtn ${currentCategory === 'Negotiation' ? 'active' : ''}`} onClick={() => setCurrentCategory("Negotiation")} >Negotiation</button>
        <button type="button" class={`mebtn ${currentCategory === 'Litigation' ? 'active' : ''}`} onClick={() => setCurrentCategory("Litigation")} >Litigation</button>
     </div>
      </div>

            <div class="container-fluid" data-aos="fade-up">

  

                <div class="row">

                    <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">
                    <div class="content tabscroll">
                    <h3>{userState.user.username}'s cases</h3>
                    <p></p>
                    <Table bordered hover className='bg-white tabscroll' size="sm">
                                                            <thead>
                                                                <tr>
                                                              
                                                                <th >N</th>
                                                                    <th className="border-0 text-center one-line">Case Name</th>
                                                                    <th className="border-0 text-center">FileVine ID#</th>
                                                                    <th className="border-0 text-center">DOL</th>
                                                                    
                                                                    
                                                                   
                                                                    <th className="border-0 text-center">Transferred to Demand</th>
                                                                    <th className="border-0 text-center ">Demand Letter Sent</th>
                                                                    <th className="border-0 text-center">Offer Received</th>
                                                                    <th className="border-0 text-center">Nego Transfer Date</th>
                                                                    <th className="border-0 text-center">Negotiator Name</th>
                                                                    <th className="border-0 text-center">Litigation Transfer Date</th>
                                                                    <th className="border-0 text-center">Litigaion Name</th>
                         
                                                                    <th className="border-0 text-center">Initial Medical Bills</th>
                                                                    <th className="border-0 text-center">Initial Offer</th>
                                                                    

                                                        
                                                                    <th className="border-0 text-center">Tendered Policy</th>
                                                                    <th className="border-0 text-center">Boicourt Transfer</th>
                                                                    <th className="border-0 text-center">Case Manager</th>
                                                                    <th className="border-0 text-center">Notes</th>
                                                                    <th className="border-0 text-center">Last Update</th>
                
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

export default AllDemand;