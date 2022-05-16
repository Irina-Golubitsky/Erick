
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
    const [dataState, setDataState] = useState( {data:[]});
  const [rangeState, setRangeState] = useState({ dayStart: priorDate, dayEnd: today});
  useEffect(() => {
    console.log(" rangedayStart "+ rangeState.dayStart);
    console.log(" rangedayEND "+ rangeState.dayEnd);
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
    var body = {"from":"bsckevgt3","select":[1,8,17,127],"where":"{'1'.OAF.'"+quickDayStart+"'}AND{'1'.OBF.'"+ quickDayEnd+"'}","groupBy":[{"fieldId":8,"grouping":"equal-values"}],"options":{"skip":0,"compareWithAppLocalTime":false}}
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
      setDataState({data:xmlHttp.response.data})
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



 
    function getData(){
        let arr = this.state.dayStart.split("-");
    let quickDayStart=arr[1]+"/"+arr[2]+"/"+arr[0];
    let arr2 = this.state.dayEnd.split("-");
    let quickDayEnd=arr2[1]+"/"+arr2[2]+"/"+arr2[0];
    console.log(quickDayStart);
    var headers = {
        'QB-Realm-Hostname': 'arashlaw.quickbase.com',
      'User-Agent': '{User-Agent}',
      'Authorization': 'QB-USER-TOKEN b7c3vd_m9e3_0_d8z459x75p332cz9g5dn6jss3n',
      'Content-Type': 'application/json'
    }
    var body = {"from":"bsckevgt3","select":[1,8,17,127],"where":"{'1'.OAF.'"+quickDayStart+"'}AND{'1'.OBF.'"+ quickDayEnd+"'}","groupBy":[{"fieldId":8,"grouping":"equal-values"}],"options":{"skip":0,"compareWithAppLocalTime":false}}
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
    }
    };
    
    
               xmlHttp.send(JSON.stringify(body));   ;
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
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Marketing Platform</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
     
                      <th className="border-0">Platform</th>
                      <th className="border-0">Calls Received</th>
                      <th className="border-0">In-Office</th>
                      <th className="border-0">Follow-up Lock-in</th>
                      <th className="border-0">Pending</th>
                      <th className="border-0">Total</th>
                      <th className="border-0">Cases Closed Distribution</th>
                      <th className="border-0">Conversion Rate</th>
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
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
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
