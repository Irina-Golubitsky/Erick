
import React, { useState , useEffect } from 'react';
import {  QUERY_ME } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import StudentForm from '../../components/StudentForm';
import ShowTable from '../../components/ShowTable';
import { DELETE_STUDENT, ADD_EVENT} from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import IntakesD from '../../components/IntakesD';
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
  } from "react-bootstrap";

const IntDashboard = props => {
    var date = new Date();
   
    var today = date.toISOString().split('T')[0];
    date.setDate(date.getDate() - 30);
    var priorDate = date.toISOString().split('T')[0];
    const [dataState, setDataState] = useState([]);
    const [reportMarket, setReportMarket] = useState([{ platform: "", calls: 0}]); 
  const [rangeState, setRangeState] = useState({ dayStart: priorDate, dayEnd: today});
  useEffect(() => {
    let arr = rangeState.dayStart.split("-");
    let quickDayStart=arr[1]+"/"+arr[2]+"/"+arr[0];
    let arr2 = rangeState.dayEnd.split("-");
    let quickDayEnd=arr2[1]+"/"+arr2[2]+"/"+arr2[0];
    console.log(quickDayStart);
    var headers = {
        'QB-Realm-Hostname': 'arashlaw.quickbase.com',
      'User-Agent': '{User-Agent}',
      'Authorization': 'QB-USER-TOKEN b7c3vd_m9e3_0_d8z459x75p332cz9g5dn6jss3n',
      'Content-Type': 'application/json'
    }
    var body = {"from":"bsckevgt3","select":[1 ,8,17,127] ,"where":"{'1'.OAF.'"+quickDayStart+"'}AND{'1'.OBF.'"+ quickDayEnd+"'}","groupBy":[{"fieldId":8,"grouping":"equal-values"}],"options":{"skip":0,"compareWithAppLocalTime":false}}
    console.log(body);
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = 'json';
    xmlHttp.open('POST', 'https://api.quickbase.com/v1/records/query', true);
    for (const key in headers) {
    xmlHttp.setRequestHeader(key, headers[key]);
    }
    xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === XMLHttpRequest.DONE) {
      console.log(xmlHttp.response.data);
    //   setDataState({data:xmlHttp.response.data})
    let dataR1=xmlHttp.response.data;
    if (dataR1.length>0){
    // let currentPlatform=dataR1[0].1.value;
    let currentPlatform = dataR1[0][8].value;
    let calls=0;
    let inOffice=0;
    let fl=0;
    let resultArray=[];
    let i=0;
    let pending=0;
    let none=0; 
    let soft=0;
    let si=0;
    let cat=0;
    let totalcalls=dataR1.length;
   while (i<dataR1.length){
        if (currentPlatform===dataR1[i][8].value){
            calls++;
            if (dataR1[i][17].value==='In-Office'){ inOffice++}
            if ((dataR1[i][17].value==='Follow-up')||(dataR1[i][17].value==='Lock-in')){ fl++}
            if ((dataR1[i][17].value==='Pending')){ pending++}
            if (dataR1[i][127].value==='None'){ none++}
            if (dataR1[i][127].value==='Soft Tissue'){ soft++}
            if (dataR1[i][127].value==='SI - Serious Injury'){ si++}
            i++;
            if (i===dataR1.length){
                resultArray.push({platform: currentPlatform, calls: calls,
                     inOffice: inOffice, fl:fl, pending:pending, total: inOffice+fl+pending, closed:0, conversion:0});  
            }
        } else {
            resultArray.push({platform: currentPlatform, calls: calls,inOffice: inOffice, fl:fl, pending:pending, total: inOffice+fl+pending,closed:0, conversion:0});
            currentPlatform=dataR1[i][8].value;
            calls=0;
            inOffice=0;
            pending=0;
           
        }
    }
    let totoalSum=0;
    resultArray.map((element) => { totoalSum=totoalSum+element.total });
    resultArray.map((element) => { 
        element.closed=(element.total*100/totoalSum).toFixed(2);
        element.conversion=(element.total*100/element.calls).toFixed(2);
    });
    setDataState(resultArray);
    console.log(resultArray);
    }
}
    };
    
    
               xmlHttp.send(JSON.stringify(body));   ;
  },[rangeState]);

  const [updateUser] = useMutation(UPDATE_USER);
  const { loading, data } = useQuery( QUERY_ME, {    
  });
  const user = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4 class="login-error">
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }


  function renderListing() {
    let recordList = [];
    
   
    dataState.map(record => {
       
        recordList.push(<tr>
        <td>{record.platform}</td>
        <td>{record.calls}</td>
        { record.inOffice>0 ? <td>{record.inOffice}</td> : <td></td>}
        { record.fl>0 ? <td>{record.fl}</td> : <td></td>}
        { record.pending>0 ? <td>{record.pending}</td> : <td></td>}
        { record.total>0 ? <td>{record.total}</td> : <td></td>}
        { record.closed>0 ? <td>{record.closed}%</td> : <td></td>}
        { record.conversion>0 ? <td>{record.conversion}%</td> : <td></td>}
      
        </tr>);
    })

    return recordList;
}
function renderTotal1() {
    let recordList = [];
    let tcalls=0;
    let tinOffice=0;
    let tfl=0;
    let tpending=0;
    let ttotal=0;
    
  
    dataState.map(record => {
        tcalls=tcalls+record.calls;
        tinOffice=tinOffice+record.inOffice;
        tfl=tfl+record.fl;
        tpending=tpending+record.pending;
        ttotal=ttotal+record.total;
    })

    return (
        <tr className="font-weight-bold">
        <td >Total</td>
        <td>{tcalls}</td>
        <td>{tinOffice}</td>
        <td>{tfl}</td>
        <td>{tpending}</td>
        <td>{ttotal}</td>
        <td></td>
        <td></td>
        </tr>

    );
}
 
   



    const handleChange = event => {
        const { name, value } = event.target;
    console.log(name + " "+ value);
        setRangeState({
          ...rangeState,
          [name]: value
        
        });
        
        // console.log(this.state.dayStart);
        // getData();
         
    };
         
 
  

  return (

    <div id="info" class="section-bg">
      <div class="container-fluid" data-aos="fade-up">

        <div class="row">

          <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">

            <div class="content">
              <h3>Dashboard: Intakes</h3>
              
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
                    onChange={ handleChange} required />
                </div>
                <div class="col-2" >
                  
                  <input      
                    name="dayEnd"
                    type="date"
                    id="end"
                    value={rangeState.dayEnd}
                    onChange={handleChange} required />
                </div>
                
                {/* <div class="col-2 "><button class="tablebtn" type="submit" onClick={addEventBtn} >
                  Show Report
                </button></div> */}

              </div>

              <section id="services" class="services ">
    <div class="row">
    <Container fluid>
        <Row >
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Marketing Platform</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table striped bordered hover>
                  <thead>
                    <tr>
     
                      <th className="border-0 text-center">Platform</th>
                      <th className="border-0 text-center">Calls Received</th>
                      <th className="border-0 text-center">In-Office</th>
                      <th className="border-0 text-center">Follow-up Lock-in</th>
                      <th className="border-0 text-center">Pending</th>
                      <th className="border-0 text-center">Total</th>
                      <th className="border-0 text-center">Cases Closed Distribution</th>
                      <th className="border-0 text-center">Conversion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderListing()}
                    {renderTotal1()}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
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
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
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

export default IntDashboard;
