import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GETRANGENEGO} from '../../utils/queries';
import { ALL_PREFS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Auth from '../../utils/auth';

import {
    Card,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";


const NegoDashboard = props => {

    var date = new Date();

    var today = date.toISOString().split('T')[0];
    date.setDate(date.getDate() - 60);
    var priorDate = date.toISOString().split('T')[0];

    const [rangeState, setRangeState] = useState({ dayStart: priorDate, dayEnd: today });

    const [report1State, setreport1State] = useState([]);
    const [report2State, setreport2State] = useState([]);
    const [report3State, setreport3State] = useState([]);
    const [prefsState, setprefsState] = useState([]);

       
        const { loading, data } = useQuery(QUERY_GETRANGENEGO, {
            variables:{date1:rangeState.dayStart, date2:rangeState.dayEnd}
        });    
        const { loading: loading2, data: data2 } = useQuery(ALL_PREFS, {
        });
   

                  
  
    useEffect(() => {
        
       setreport1State(data?.getRangeNego);
      
PrepareData23();
                  
    }, [ data]);
    useEffect(() => {
        if (typeof data2 !== "undefined") {
            setprefsState(data2.preferences.negoclaim)

        }
    }, [data2]);
  
    if (loading) {
        return <div>Loading...</div>;
    }
    if (loading2) {
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
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
   
function PrepareData23(){
    console.log ("hi");
    let firstnego="";
    let quantity=0;
    let offer=0;
    let finaloffer=0;
    let medicalbill=0;
    let finalmedicalbill=0;
    let feesper=0;
    let feesmoney=0;
    let report2=[];
    let report3=[];

    let casedata=data?.getRangeNego||[];
    if (casedata.length>0){ firstnego=casedata[0].negomem}
    let j=0;
    for (let j=0;j<casedata.length;j++) { 
        if (casedata[j].negomem===firstnego){
            quantity++;
            offer=offer+casedata[j].offer;
            finaloffer=finaloffer+casedata[j].finaloffer;
            medicalbill=medicalbill+casedata[j].medicalbill;
            finalmedicalbill=finalmedicalbill+casedata[j].finalmedicalbill;
            feesper=feesper+casedata[j].feesper;
            feesmoney=feesmoney+casedata[j].feesmoney;
        } else if (j<casedata.length){
            report2.push({negomem:firstnego, quantity:quantity, offer:offer.toFixed(2),finaloffer:finaloffer.toFixed(2), medicalbill:medicalbill.toFixed(2),
                finalmedicalbill:finalmedicalbill.toFixed(2),feesper:(feesper/quantity).toFixed(2), feesmoney:feesmoney.toFixed(2)
            });
            firstnego=casedata[j].negomem;
             quantity=1;
            offer=casedata[j].offer;
            finaloffer=casedata[j].finaloffer;
            medicalbill=casedata[j].medicalbill;
            finalmedicalbill=casedata[j].finalmedicalbill;
            finalmedicalbill=casedata[j].finalmedicalbill;
             feesper=casedata[j].feesper;
             feesmoney=casedata[j].feesmoney;
        }
        if (j===casedata.length-1) {  report2.push({negomem:firstnego, quantity:quantity, offer:offer.toFixed(2),finaloffer:finaloffer.toFixed(2), medicalbill:medicalbill.toFixed(2),
            finalmedicalbill:finalmedicalbill.toFixed(2),feesper:(feesper/quantity).toFixed(2), feesmoney:feesmoney.toFixed(2)
        }); }

    }

    // report claim nego
    for (let nego=0;nego<prefsState.length; nego++ ){
         quantity=0;
       offer=0;
        finaloffer=0;
        medicalbill=0;
        finalmedicalbill=0;
        feesper=0;
         feesmoney=0;
        for ( j=0; j<casedata.length; j++){
            if (casedata[j].negoclaim===prefsState[nego]){
                quantity++;
                offer=offer+casedata[j].offer;
                finaloffer=finaloffer+casedata[j].finaloffer;
                medicalbill=medicalbill+casedata[j].medicalbill;
                finalmedicalbill=finalmedicalbill+casedata[j].finalmedicalbill;
                feesper=feesper+casedata[j].feesper;
                feesmoney=feesmoney+casedata[j].feesmoney;
            }
        }
        report3.push({negomem:prefsState[nego], quantity:quantity, offer:offer.toFixed(2),finaloffer:finaloffer.toFixed(2), medicalbill:medicalbill.toFixed(2),
            finalmedicalbill:finalmedicalbill.toFixed(2),feesper:(feesper/quantity).toFixed(2), feesmoney:feesmoney.toFixed(2)})
    }
    console.log(report2);
    setreport2State(report2);
    setreport3State(report3);


}
   
     const handleChange = event => {
        const { name, value } = event.target;
        console.log(name + " " + value);
        setRangeState({
            ...rangeState,
            [name]: value

        });

    };
    function renderListing1() {
        let casedataList=[];
        let i=0;
        
        let usercases=report1State||[];
     
        usercases.map(casedata => {

             i++;
            casedataList.push(<tr >
            
            <td>{i}</td>
                <td >{casedata.client}</td>
                <td >{casedata.negoclaim}</td>
                
                <td >{casedata.negomem}</td>
                <td >${casedata.offer}</td>
               <td >${casedata.finaloffer}</td>
             
               <td >${casedata.medicalbill}</td>
           
               <td >${casedata.finalmedicalbill}</td>
               
                <td >{casedata.feesper}%</td>
               <td >${casedata.feesmoney}</td>
               
    
                
            </tr>);}
        )

        return casedataList;
    }
    function renderListing23(reportNumber) {
        let casedataList=[];
        let totalquantity=0, totaloffer=0, totalfinaloffer=0, totalmedicalbill=0,
        totalfinalbill=0, totalfeesper=0, totalfeesmoney=0;
        let usercases=[];
     
        if (reportNumber===2)
        { usercases=report2State;}
        else {usercases=report3State; }
     
        usercases.map(casedata => {
            totalquantity=totalquantity+Number(casedata.quantity);
            totaloffer=totaloffer+Number(casedata.offer);
            totalfinaloffer=totalfinaloffer+Number(casedata.finaloffer);
            totalmedicalbill=totalmedicalbill+Number(casedata.medicalbill);
            totalfinalbill=totalfinalbill+Number(casedata.finalmedicalbill);
            totalfeesper=totalfeesper+Number(casedata.feesper);
            totalfeesmoney=totalfeesmoney+Number(casedata.feesmoney);


            
            casedataList.push(<tr >
            
          
               
                
                <td >{casedata.negomem}</td>
                <td>{casedata.quantity}</td>
                <td >${formatNumber(casedata.offer)}</td>
               <td >${formatNumber(casedata.finaloffer)}</td>
             
               <td >${formatNumber(casedata.medicalbill)}</td>
           
               <td >${formatNumber(casedata.finalmedicalbill)}</td>
               
                <td >{casedata.feesper}%</td>
               <td >${formatNumber(casedata.feesmoney)}</td>
               
    
                
            </tr>);})

            casedataList.push(<tr class="font-weight-bold">
            
          
               
                
                <td >Total</td>
                <td>{totalquantity}</td>
                <td >${formatNumber(parseFloat(totaloffer).toFixed(2))}</td>
               <td >${formatNumber(parseFloat(totalfinaloffer).toFixed(2))}</td>
             
               <td >${formatNumber(parseFloat(totalmedicalbill).toFixed(2))}</td>
           
               <td >${formatNumber(parseFloat(totalfinalbill).toFixed(2))}</td>
               
                <td >{formatNumber(parseFloat(totalfeesper/usercases.length).toFixed(2))}%</td>
               <td >${formatNumber(parseFloat(totalfeesmoney).toFixed(2))}</td>
               
    
                
            </tr>);
        

        return casedataList;
    }
     

    return (


        <div id="info" class="section-bg">
        <div class="container-fluid" data-aos="fade-up">

            <div class="row">

                <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">

                    <div class="content">
                        <h3>Dashboard: Negotiations</h3>
                        <p>
                        </p>
                        <div class="row justify-content-start ">
                                <div class="col-1 " >
                                    <h4>Range: </h4>

                                </div>
                                <div class="col-2" >
                                    <input
                                        name="dayStart"
                                        type="date"
                                        id="start"
                                        value={rangeState.dayStart}
                                        onChange={handleChange} required />
                                </div>
                                <div class="col-2" >

                                    <input
                                        name="dayEnd"
                                        type="date"
                                        id="end"
                                        value={rangeState.dayEnd}
                                        onChange={handleChange} required />
                                </div>

                            </div>
                      

                        <section id="services" class="services ">
                            <div class="row">
                                <Container fluid>
                                    <Row >
                                        <Col md="12">
                                            <Card className="tabled-with-hover">
                                                <Card.Header>
                                                    <Card.Title   as="h4">Medical Negotiators & Claim Negotiators</Card.Title>
                                                    <p className="card-category">
                                                       Statistics
                                                    </p>
                                                </Card.Header>
                                                <Card.Body className="table-full-width table-responsive px-0">
                                                <p className="card-category text-center font-weight-bold">
                                                      Medical Negotiators
                                                    </p>
                                                    <Table striped bordered hover size="sm">
                                                    
                                                    <thead>
                                                                <tr>
            
                                                                    <th className="border-0 text-center one-line">Team Member</th>
                                                                 
                                                                    <th className="border-0 text-center">Quantity</th>
                                                                    <th className="border-0 text-center">Initial Offer</th>
                                                                    <th className="border-0 text-center">Final Settelment</th>
                              
                                                                    <th className="border-0 text-center ">Original Medical</th>
                                                                    <th className="border-0 text-center">Settled Medical</th>
                                                                    <th className="border-0 text-center">Attoney Fees %</th>
                                                                    <th className="border-0 text-center">Attorney Fees $</th>
              
    
                
                                                                </tr>
                                                            </thead>
                                                            <tbody className='tabscroll '>
  {renderListing23(2)}
                                                            </tbody>
                                                    </Table>
                                                    <p className="card-category text-center font-weight-bold">
                                                      Claim Negotiators
                                                    </p>
                                                    <Table striped bordered hover size="sm">
                                                    
                                                    <thead>
                                                                <tr>
            
                                                                    <th className="border-0 text-center one-line">Team Member</th>
                                                                 
                                                                    <th className="border-0 text-center">Quantity</th>
                                                                    <th className="border-0 text-center">Initial Offer</th>
                                                                    <th className="border-0 text-center">Final Settelment</th>
                              
                                                                    <th className="border-0 text-center ">Original Medical</th>
                                                                    <th className="border-0 text-center">Settled Medical</th>
                                                                    <th className="border-0 text-center">Attoney Fees %</th>
                                                                    <th className="border-0 text-center">Attorney Fees $</th>
              
    
                
                                                                </tr>
                                                            </thead>
                                                            <tbody className='tabscroll '>
  {renderListing23(3)}
                                                            </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <p></p>
                                        <Col md="12">
                                            <Card className="card-plain table-plain-bg">
                                                <Card.Header>
                                                    <Card.Title as="h4">Cases</Card.Title>
                                                    <p className="card-category">
                                                        
                                                    </p>
                                                </Card.Header>
                                                <Card.Body className="table-full-width table-responsive px-0">
                                                <Table bordered hover className='bg-white tabscroll' size="sm">
                                                            <thead>
                                                                <tr>
                                                               
                                                                <th className="border-0 text-center" >N</th>
                                                                <th className="border-0 text-center">Client</th>
                                                                    <th className="border-0 text-center one-line">Claim Negotiator</th>
                                                                 
                                                                    <th className="border-0 text-center">Medical Negotiator</th>
                                                                    <th className="border-0 text-center">Initial Offer</th>
                                                                    <th className="border-0 text-center">Final Settelment</th>
                              
                                                                    <th className="border-0 text-center ">Original Medical</th>
                                                                    <th className="border-0 text-center">Settled Medical</th>
                                                                    <th className="border-0 text-center">Attoney Fees %</th>
                                                                    <th className="border-0 text-center">Attorney Fees $</th>
              
    
                
                                                                </tr>
                                                            </thead>
                                                            <tbody className='tabscroll '>
                                                            {renderListing1()}
                                                            </tbody>
                                                        </Table>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                       
                                    
                                    </Row>
                                </Container>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
};

export default NegoDashboard;