import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from '../../utils/queries';
import { ALL_PREFS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Auth from '../../utils/auth';
import Hero from '../Hero'
import {
    Button,
  
    Table

} from "react-bootstrap";
import Header from '../Header';

const Nego = props => {
    const history = useHistory();
    const [currentCategory, setCurrentCategory] = useState('Negotiation');
    

    const { loading, data } = useQuery( QUERY_ME, {    
    });
    const user = data?.me || {};
    console.log("user " + user.username);
    const [prefsState, setprefsState] = useState({    
       
        umuim: "",
        language:"",
        negostatus:"",
        negoclaim:""
       
      });
  
    const { loading:loading2, data:data2 } = useQuery(ALL_PREFS, {
    });
    const prefs = data2?.preferences || [];
    useEffect(() => {
        if (typeof prefs !== "undefined") {
           setprefsState({ 
           umuim:prefs.umuim,
           language:prefs.language,
        negostatus:prefs.negostatus,
        negoclaim:prefs.negoclaim
            
            });

        }
       
      }, [ data2]);
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
    const handleRowClick = (row) => {
        history.push(`/nego/case${row}`);
      }  

    //   onClick={()=> handleRowClick(casedata._id)} 

    function NextCall(mydate){
        mydate=mydate.split("/");
        
        

    let lastcall=new Date(parseInt(mydate[2]), parseInt(mydate[0])-1, parseInt(mydate[1])+14);
    lastcall=lastcall.toISOString().split('T')[0];
    lastcall=lastcall.split("-");


        return  lastcall[1]+'/'+ lastcall[2]+"/"+lastcall[0]

    }

   function renderListing() {
        let casedataList=[];
        let i=0;
        let usercases=user.cases||[];
        console.log(usercases);
        usercases.map(casedata => {

            if (casedata.phase===currentCategory){ i++;
            casedataList.push(<tr >
            <td > <Link to={{
    pathname: `/nego/case${casedata._id}`,
    state: { ...prefsState }
  }}
                >     <button
                    className="tablebtn"
                    key={casedata._id}
                   >
                    ✓
                  </button></Link>
                </td>
                <td>{i}</td>
                <td >{casedata.username}</td>
                <td >{casedata.client}</td>
                
                <td >{casedata.fv}</td>
                <td >{casedata.language}</td>
               <td >{casedata.dol}</td>
               <td >{casedata.phase}</td>
               <td >{casedata.transferedtonego}</td>
               {casedata.offer !== "NaN" ? <td>{casedata.offer}</td> : <td></td>}
               <td >{casedata.finaloffer}</td>
               {casedata.medicalbill !=="NaN" ? <td>{casedata.medicalbill}</td> : <td></td>}
               
                <td >{casedata.finalmedicalbill}</td>
                <td >{casedata.feesper}</td>
               <td >{casedata.feesmoney}</td>
                <td >{casedata.lastcall}</td>
                {((casedata.lastcall !== null)&(casedata.lastcall !== "NaN-NaN-NaN") )? <td>{NextCall(casedata.lastcall)}</td> : <td></td>}
                <td >{casedata.negostatus}</td>
               <td >{casedata.negoclaim}</td>
                <td >{casedata.umuim}</td>

                <td >{casedata.med}</td>
                <td >{casedata.negonotes}</td>

                <td >{casedata.outclient}</td>
               
                <td >{casedata.outrandal}</td>
              
    
                
            </tr>);}}
        )

        return casedataList;
    }
    return (



        <div id="info" class="section-bg-full">

       

            <div class="container-fluid" data-aos="fade-up">
            <div class=" d-flex justify-content-center">
        
        <button type="button" class={`mebtn ${currentCategory === 'Negotiation' ? 'active' : ''}`} onClick={() => setCurrentCategory("Negotiation")} >Negotiation</button>
        <button type="button" class={`mebtn ${currentCategory === 'Storage' ? 'active' : ''}`} onClick={() => setCurrentCategory("Storage")} >Storage</button>
     
      </div>

  

                <div class="row">

                    <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">
                    <div class="content tabscroll">
                    <h3>{user.username}'s cases</h3>
                    <p></p>
                    <Table bordered hover className='bg-white tabscroll' size="sm">
                                                            <thead>
                                                                <tr>
                                                                <th class="checkwidth"></th>
                                                                <th >N</th>
                                                                <th className="border-0 text-center">Case Manager</th>
                                                                    <th className="border-0 text-center one-line">Case Name</th>
                                                                 
                                                                    <th className="border-0 text-center">FileVine ID#</th>
                                                                    <th className="border-0 text-center">Language</th>
                                                                    <th className="border-0 text-center">DOL</th>
                                                                    
                                                                    
                                                
                                                                    <th className="border-0 text-center">Transferred to</th>
                                                                    <th className="border-0 text-center ">Date Sent</th>
                                                                    <th className="border-0 text-center">Initial Offer</th>
                                                                    <th className="border-0 text-center">Final Offer</th>
                                                                    <th className="border-0 text-center">Initial Medical Bills</th>
                                                                    <th className="border-0 text-center">Final Medical Bills</th>
                                                                    <th className="border-0 text-center">Attorney Fees in %</th>
                                                                    <th className="border-0 text-center">Attorney Fees in $</th>
                                                                    <th className="border-0 text-center">Last Call</th>
                                                                    <th className="border-0 text-center">Next call</th>
                                                                    

                                                        
                                                                    <th className="border-0 text-center">Status</th>
                                                                    <th className="border-0 text-center">Claim Negotiator</th>
                                                                    <th className="border-0 text-center">UM/UIM </th>
                                                                    <th className="border-0 text-center">Med Pay</th>
                                                                    <th className="border-0 text-center">Notes</th>
                                                                    <th className="border-0 text-center">Out To Client</th>
                                                                    <th className="border-0 text-center">Out to Randal</th>
                   
                
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

export default Nego;