import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ACTIVEMANAGERS} from '../../utils/queries';
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


const ManagersDashboard = props => {
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

            <div class="row">

                <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">

                    <div class="content">
                        <h3>Dashboard: Managers</h3>
                        <p>
                        </p>
                      

                        <section id="services" class="services ">
                            <div class="row">
                                <Container fluid>
                                    <Row >
                                        <Col md="12">
                                            <Card className="strpied-tabled-with-hover">
                                                <Card.Header>
                                                    <Card.Title as="h4">Case Manager VS. Stage of the case</Card.Title>
                                                    <p className="card-category">
                                                        & Total Number of cases
                                                    </p>
                                                </Card.Header>
                                                <Card.Body className="table-full-width table-responsive px-0">
                                                    <Table striped bordered hover>
                                                        <thead>
                                                        <tr>

                                                            <th colspan="8" className="border-0 text-center">Case Manager VS. Stage of the case</th>
                                                            <th colspan="2" className="border-1 text-center">Total Number of cases</th>
                                                        </tr>
                                                            <tr>

                                                                <th className="border-0 text-center">Employee Name</th>
                                                                <th className="border-0 text-center">Investigation & Treatment</th>
                                                                <th className="border-0 text-center">Drop</th>
                                                                <th className="border-0 text-center">Sub Out</th>
                                                                <th className="border-0 text-center">Collecting Meds</th>
                                                                <th className="border-0 text-center">Litigation</th>
                                                                <th className="border-0 text-center">Demand</th>
                                                                <th className="border-0 text-center">Negotiation</th>
                                                                <th className="border-1 text-center">Employee Name</th>
                                                                <th className="border-0 text-center">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                          
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <p></p>
                                        <Col md="12">
                                            <Card className="card-plain table-plain-bg">
                                                <Card.Header>
                                                    <Card.Title as="h4">Marketing Platform VS Level of Injury</Card.Title>
                                                    <p className="card-category">
                                                        Here is a subtitle for this table
                                                    </p>
                                                </Card.Header>
                                                <Card.Body className="table-full-width table-responsive px-0">
                                                    <Table className="table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th className="border-0 text-center">Platform</th>
                                                                <th className="border-0 text-center">Calls Received</th>
                                                                <th className="border-0 text-center">None</th>
                                                                <th className="border-0 text-center">Soft Tissue</th>
                                                                <th className="border-0 text-center">SI - Serious Injury</th>
                                                                <th className="border-0 text-center">CAT - Catastrophic</th>
                                                                <th className="border-0 text-center">Death - Wrongful Death</th>
                                                                <th className="border-0 text-center">Total</th>
                                                                <th className="border-0 text-center">Case Distribution</th>
                                                                <th className="border-0 text-center">Conversion Rate</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                           
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <p></p>
                                        <Col md="12">
                                            <Card className="card-plain table-plain-bg">
                                                <Card.Header>
                                                    <Card.Title as="h4">Time</Card.Title>
                                                    <p className="card-category">
                                                        Here is a subtitle for this table
                                                    </p>
                                                </Card.Header>
                                                <Card.Body className="table-full-width table-responsive px-0">
                                                    <Table className="table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th className="border-0 text-center">Platform</th>
                                                                <th className="border-0 text-center">5 AM</th>
                                                                <th className="border-0 text-center">6 AM</th>
                                                                <th className="border-0 text-center">7 AM</th>
                                                                <th className="border-0 text-center">8 AM</th>
                                                                <th className="border-0 text-center">9 AM</th>
                                                                <th className="border-0 text-center">10 AM</th>
                                                                <th className="border-0 text-center">11 AM</th>
                                                                <th className="border-0 text-center">12 PM</th>
                                                                <th className="border-0 text-center">1 PM</th>
                                                                <th className="border-0 text-center">2 PM</th>
                                                                <th className="border-0 text-center">3 PM</th>
                                                                <th className="border-0 text-center">4 PM</th>
                                                                <th className="border-0 text-center">5 PM</th>
                                                                <th className="border-0 text-center">6 PM</th>
                                                                <th className="border-0 text-center">7 PM</th>
                                                                <th className="border-0 text-center">8 PM</th>
                                                                <th className="border-0 text-center">9 PM</th>
                                                                <th className="border-0 text-center">10 PM</th>
                                                                <th className="border-0 text-center">11 PM</th>
                                                                <th className="border-0 text-center">12 PM</th>
                                                                <th className="border-0 text-center">1 AM</th>
                                                                <th className="border-0 text-center">2 AM</th>
                                                                <th className="border-0 text-center">3 AM</th>
                                                                <th className="border-0 text-center">4 AM</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        
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

export default ManagersDashboard;