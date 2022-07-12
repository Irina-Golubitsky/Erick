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
    const [report1State, setreport1State] = useState({data:""});
    const [report2State, setreport2State] = useState({data:""});
    const [report3State, setreport3State] = useState({data:""});
    
  

    const { loading, data } = useQuery(QUERY_ACTIVEMANAGERS, {
    });
    useEffect(() => {
        if (typeof data !== "undefined")  {
            
            let managers=data.activemanagers;
            let report1=[];
            let report2=[];
            let report3=[];
            console.log(managers);
            for (let i=0;i<managers.length;i++){
                 let manager=managers[i].username;
                 let department=managers[i].department;
                 console.log(manager);
                 let investigation=0;
                 let drop=0;
                 let subout=0;
                 let colmeds=0;
                 let litigation=0;
                 let demand=0;
                 let negotiation=0;
                 let total=0;
                 
                 let phy1=0, phy2=0, phy3=0;
                 let ser1=0, ser2=0, ser3=0;
                 let cat1=0, cat2=0, cat3=0;
                 let total2=0;

                 let p1=0,p2=0,p3=0,p4=0,p5=0,p6=0,p7=0,p8=0,p9=0,p10=0,p11=0;
                 let total3=0;
                 let totalall=managers[i].cases.length;
                 for (let j=0;j<managers[i].cases.length;j++){
                    let thiscase=managers[i].cases[j];
                    if (thiscase.phase==="Investigation & Treatment"){investigation++; total++ }
                    else if (thiscase.phase==="Drop"){drop++ ; total++}
                    else if (thiscase.phase==="Sub Out"){subout++ ; total++}
                    else if (thiscase.phase==="Collecting Meds"){colmeds++; total++ }
                    else if (thiscase.phase==="Litigation"){litigation++ ; total++}
                    else if (thiscase.phase==="Demand"){demand++; total++ }
                    else if (thiscase.phase==="Negotiation"){negotiation++; total++ }

                    // levelinjury

                    if (thiscase.levelinjury==="Physical Injury"){
                        if (thiscase.level==="Level 1") {phy1++; total2++ }
                        else if (thiscase.level==="Level 2") {phy2++; total2++ }
                        if (thiscase.level==="Level 3") {phy3++; total2++ }
                    } else  if (thiscase.levelinjury==="Serious Injury"){
                        if (thiscase.level==="Level 1") {ser1++; total2++ }
                        else if (thiscase.level==="Level 2") {ser2++; total2++ }
                        if (thiscase.level==="Level 3") {ser3++; total2++ }
                    }else  if (thiscase.levelinjury==="Catastrophic Injury"){
                        if (thiscase.level==="Level 1") {cat1++; total2++ }
                        else if (thiscase.level==="Level 2") {cat2++; total2++ }
                        if (thiscase.level==="Level 3") {cat3++; total2++}
                    }

                    // policy
                    // 15k/30k,20K/40K,25k/50k,30K/60K,50k/100k,100K/200K,100K/300K,250K/500K,300K/300K,300K/500K, 500k/500k,750k/750K,950K/950K,
                    // Commercial,No Coverage,Alliance United,Dairyland,Viking,
                    // Workman's Auto, Kemper,Infinity,Loya Casualty,Fred Loya,The General,Soft Tissue,UBER/LYFT,1 Million

                    if (thiscase.policy==="15k/30k"){p1++; total3++ }
                    else if (thiscase.policy==="25k/50k"){p2++ ; total3++}
                    else if (thiscase.policy==="30K/60K"){p3++ ; total3++}
                    else if (thiscase.policy==="50k/100k"){p4++ ; total3++}
                    else if (thiscase.policy==="100K/200K"){p5++ ; total3++}
                    else if (thiscase.policy==="100K/300K"){p6++ ; total3++}
                    else if (thiscase.policy==="300K/300K"){p7++ ; total3++}
                    else if (thiscase.policy==="250K/500K"){p7++ ; total3++}
                    else if (thiscase.policy==="300K/500K"){p9++ ; total3++}
                    else if ((thiscase.policy==="500k/500k")||(thiscase.policy==="750k/750K")||(thiscase.policy==="950K/950K")){p10++ ; total3++}
                    else {p11++ ; total3++}


                 }
                 report1.push({manager:manager,department:department,investigation:investigation,drop:drop,subout:subout,
                    colmeds:colmeds,litigation:litigation,demand:demand, negotiation:negotiation, total:total,totalall:totalall});
                 report2.push({manager:manager,department:department,phy1:phy1, phy2:phy2,phy3:phy3, ser1:ser1,ser2:ser2,ser3:ser3,
                cat1:cat1, cat2:cat2, cat3:cat3, total2:total2});
                report3.push({manager:manager,department:department,p1:p1, p2:p2,p3:p3,p4:p4,p5:p5,p6:p6,p7:p7,p8:p8,
                    p9:p9,p10:p10,p11:p11,total3:total3});
              


            }
            console.log(report1);
            setreport1State({data:report1})
            setreport2State({data:report2})
            setreport3State({data:report3})
            

            }       
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
   

    function renderListing() {
       let casedataList=[];
        let report1=report1State.data;
        let department="";
        let investigation=0;
        let drop=0;
        let subout=0;
        let colmeds=0;
        let litigation=0;
        let demand=0;
        let negotiation=0;
        let total=0;
        let totalall=0;
        if (report1!==""){let department=report1[0].department;
        
        casedataList.push(<tr>

            <th colspan="9" className=" text-center text-light bg-dark text-left" >{department}</th>
            <th colspan="2" className="border-1 text-center text-light bg-dark text-left">{department}</th>
        </tr>);

        
        report1.map(repdata => {

            if (repdata.department!==department){
                department=repdata.department;
                casedataList.push(<tr>

                    <th colspan="9" className=" text-center text-light bg-dark text-left" >{department}</th>
                    <th colspan="2" className="border-1 text-center text-light bg-dark text-left">{department}</th>
                </tr>); 
                
            }

            
            casedataList.push(<tr >
        
                <td >{repdata.manager}</td>
                <td >{repdata.investigation}</td> 
                <td >{repdata.drop}</td> 
                <td >{repdata.subout}</td>
                <td >{repdata.colmeds}</td>
                <td >{repdata.litigation}</td>
                <td >{repdata.demand}</td>
                <td >{repdata.negotiation}</td>
                <td >{repdata.total}</td>
                <td >{repdata.manager}</td>
                <td >{repdata.totalall}</td>
            </tr>);
            investigation=investigation+repdata.investigation;
            drop=drop+repdata.drop;
            subout=subout+repdata.subout;
            colmeds=colmeds+repdata.colmeds;
            litigation=litigation+repdata.litigation;
            demand=demand+repdata.demand;
            negotiation=negotiation+repdata.negotiation;
            total=total+repdata.total;
            totalall=totalall+repdata.totalall;

            
            }
              
      
      

        )
      casedataList.push(<tr  className='font-weight-bold' >
        
            <td >Total</td>
            <td >{investigation}</td> 
            <td >{drop}</td> 
            <td >{subout}</td>
            <td >{colmeds}</td>
            <td >{litigation}</td>
            <td >{demand}</td>
            <td >{negotiation}</td>
            <td >{total}</td>
            <td >Total</td>
            <td >{totalall}</td>
        </tr>);
            }

        return casedataList;
    }
    function renderListing2() {
        let casedataList=[];
         let report2=report2State.data;
         let department="";
         let phy1=0, phy2=0, phy3=0;
                 let ser1=0, ser2=0, ser3=0;
                 let cat1=0, cat2=0, cat3=0;
                 let total2=0;
         if (report2!==""){let department=report2[0].department;
         
         casedataList.push(<tr>
 
             <th colspan="11" className=" text-center text-light bg-dark text-left" >{department}</th>
           
         </tr>);
 
         
         report2.map(repdata => {
 
             if (repdata.department!==department){
                 department=repdata.department;
                 casedataList.push(<tr>
 
                     <th colspan="11" className=" text-center text-light bg-dark text-left" >{department}</th>
                 </tr>); 
                 
             }
 
             
             casedataList.push(<tr >
         
                 <td >{repdata.manager}</td>
                 <td >{repdata.phy1}</td> 
                 <td >{repdata.phy2}</td> 
                 <td >{repdata.phy3}</td>
                 <td >{repdata.ser1}</td>
                 <td >{repdata.ser2}</td>
                 <td >{repdata.ser3}</td>
                 <td >{repdata.cat1}</td>
                 <td >{repdata.cat2}</td>
                 <td >{repdata.cat3}</td>
                 <td >{repdata.total2}</td>
             </tr>);
             phy1=phy1+repdata.phy1;
             phy2=phy2+repdata.phy2;
             phy3=phy3+repdata.phy3;
             ser1=ser1+repdata.ser1;
             ser2=ser2+repdata.ser2;
             ser3=ser3+repdata.ser3;
             cat1=cat1+repdata.cat1;
             
             total2=total2+repdata.total2;
 
             
             }
               
       
       
 
         )
       casedataList.push(<tr  className='font-weight-bold' >
         
             <td >Total</td>
             <td >{phy1}</td> 
             <td >{phy2}</td> 
             <td >{phy3}</td> 
             <td >{ser1}</td> 
             <td >{ser2}</td> 
             <td >{ser3}</td> 
             <td >{cat1}</td> 
             <td >{cat2}</td>
             <td >{cat3}</td>
             <td >{total2}</td>
         </tr>);
             }
 
         return casedataList;
     }
     function renderListing3() {
        let casedataList=[];
         let report1=report3State.data;
         let department="";
         let p1=0,p2=0,p3=0,p4=0,p5=0,p6=0,p7=0,p8=0,p9=0,p10=0, p11=0;
         let total3=0;
         if (report1!==""){let department=report1[0].department;
         
         casedataList.push(<tr>
 
             <th colspan="13" className=" text-center text-light bg-dark text-left" >{department}</th>
             
         </tr>);
 
         
         report1.map(repdata => {
 
             if (repdata.department!==department){
                 department=repdata.department;
                 casedataList.push(<tr>
 
                     <th colspan="13" className=" text-center text-light bg-dark text-left" >{department}</th>
                  
                 </tr>); 
                 
             }
 
             
             casedataList.push(<tr >
         
                 <td >{repdata.manager}</td>
                 <td >{repdata.p1}</td> 
                 <td >{repdata.p2}</td> 
                 <td >{repdata.p3}</td> 
                 <td >{repdata.p4}</td> 
                 <td >{repdata.p5}</td> 
                 <td >{repdata.p6}</td> 
                 <td >{repdata.p7}</td> 
                 <td >{repdata.p8}</td> 
                 <td >{repdata.p9}</td> 
                 <td >{repdata.p10}</td> 
                 <td >{repdata.p11}</td> 
            
                 <td >{repdata.total3}</td>
             </tr>);
             p1=p1+repdata.p1;
             p2=p2+repdata.p2;
             p3=p3+repdata.p3;
             p4=p4+repdata.p4;
             p5=p5+repdata.p5;
             p6=p6+repdata.p6;
             p7=p7+repdata.p7;
             p8=p8+repdata.p8;
             p9=p9+repdata.p9;
             p10=p10+repdata.p10;
             p11=p11+repdata.p11;
             total3=total3+repdata.total3;
            
 
             
             }
               
       
       
 
         )
       casedataList.push(<tr  className='font-weight-bold' >
         
             <td >Total</td>

             <td >{p1}</td> 
             <td >{p2}</td> 
             <td >{p3}</td> 
             <td >{p4}</td> 
             <td >{p5}</td> 
             <td >{p6}</td> 
             <td >{p7}</td> 
             <td >{p8}</td> 
             <td >{p9}</td> 
             <td >{p10}</td> 
             <td >{p11}</td> 
          
            
             <td >{total3}</td>
         </tr>);
             }
 
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
                                            <Card className="tabled-with-hover">
                                                <Card.Header>
                                                    <Card.Title as="h4">Case Manager VS. Stage of the case</Card.Title>
                                                    <p className="card-category">
                                                        & Total Number of cases
                                                    </p>
                                                </Card.Header>
                                                <Card.Body className="table-full-width table-responsive px-0">
                                                    <Table striped bordered hover size="sm">
                                                        <thead>
                                                        <tr>

                                                            <th colspan="9" className=" text-center">Case Manager VS. Stage of the case</th>
                                                            <th colspan="2" className=" text-center">Total Number of cases</th>
                                                        </tr>
                                                            <tr>

                                                                <th className=" text-center">Employee Name</th>
                                                                <th className=" text-center">Investigation & Treatment</th>
                                                                <th className=" text-center">Drop</th>
                                                                <th className=" text-center">Sub Out</th>
                                                                <th className=" text-center">Collecting Meds</th>
                                                                <th className=" text-center">Litigation</th>
                                                                <th className=" text-center">Demand</th>
                                                                <th className=" text-center">Negotiation</th>
                                                                <th className=" text-center">Total</th>
                                                                
                                                                <th className=" text-center">Employee Name</th>
                                                                <th className=" text-center">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                          {renderListing()}
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <p></p>
                                        <Col md="12">
                                            <Card className="card-plain table-plain-bg">
                                                <Card.Header>
                                                    <Card.Title as="h4">Case Manager VS. Level of injury VS. Level of policy</Card.Title>
                                                    <p className="card-category">
                                                        Here is a subtitle for this table
                                                    </p>
                                                </Card.Header>
                                                <Card.Body className="table-full-width table-responsive px-0">
                                                    <Table bordered hover size="sm">
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-center">Employee Name</th>
                                                                    <th colspan="3" className="text-center">Physical Injury</th>
                                                                    <th colspan="3" className="text-center">Serious Injury</th>
                                                                    <th colspan="3" className="text-center">Catastrophic Injury</th>
                                                                    <th className=" text-center">Total</th>
                                                                </tr>

                                                            <tr>
                                                            <th className=" text-center"></th>
                                                                <th className=" text-center">Level 1</th>
                                                                <th className=" text-center">Level 2</th>
                                                                <th className="text-center">Level 3</th>
                                                                <th className="text-center">Level 1</th>
                                                                <th className="text-center">Level 2</th>
                                                                <th className=" text-center">Level 3</th>
                                                                <th className="text-center">Level 1</th>
                                                                <th className=" text-center">Level 2</th>
                                                                <th className=" text-center">Level 3</th>
                                                                <th className=" text-center"></th>
                                                             
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {renderListing2()}
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <p></p>
                                        <Col md="12">
                                            <Card className="card-plain table-plain-bg">
                                                <Card.Header>
                                                    <Card.Title as="h4">Case Manager VS. Policy distribution</Card.Title>
                                                    <p className="card-category">
                                                        Here is a subtitle for this table
                                                    </p>
                                                </Card.Header>
                                                <Card.Body className="table-full-width table-responsive px-0">
                                                    <Table bordered hover size="sm">
                                                        <thead>
                                                                <tr>

                                                                    <th colspan="13" className=" text-center">Case Manager VS. Policy distribution</th>
                                                                    
                                                                </tr>
                                                            <tr>
                                                       
                                                                <th className=" text-center">Employee Name</th>
                                                                <th className=" text-center">15k/30k</th>
                                                                <th className=" text-center">25k/50k</th>
                                                                <th className=" text-center">30K/60K</th>
                                                                <th className=" text-center">50k/100k</th>
                                                                <th className=" text-center">100K/200K</th>
                                                                <th className=" text-center">100K/300K</th>
                                                                <th className=" text-center">300K/300K</th>
                                                                <th className=" text-center">250K/500K</th>
                                                                <th className=" text-center">300K/500K</th>
                                                                <th className=" text-center">500K+</th>
                                                                <th className=" text-center">Multiple Policy</th>
                                                                <th className=" text-center">Total</th>
                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {renderListing3()}
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