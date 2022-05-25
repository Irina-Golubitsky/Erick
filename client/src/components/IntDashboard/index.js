
import React, { useState, useEffect } from 'react';
import { QUERY_ME } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

import Auth from '../../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import IntakesD from '../../components/IntakesD';
import {
    Card,
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
    const [reportMarket, setReportMarket] = useState([{ platform: "", calls: 0 }]);
    const [rangeState, setRangeState] = useState({ dayStart: priorDate, dayEnd: today });
   
    const { loading, data } = useQuery(QUERY_ME, {
    });

    useEffect(() => {
        let arr = rangeState.dayStart.split("-");
        let quickDayStart = arr[1] + "/" + arr[2] + "/" + arr[0];
        let arr2 = rangeState.dayEnd.split("-");
        let quickDayEnd = arr2[1] + "/" + arr2[2] + "/" + arr2[0];
        console.log(quickDayStart);
        var headers = {
            'QB-Realm-Hostname': 'arashlaw.quickbase.com',
            'User-Agent': '{User-Agent}',
            'Authorization': 'QB-USER-TOKEN b7c3vd_m9e3_0_d8z459x75p332cz9g5dn6jss3n',
            'Content-Type': 'application/json'
        }
         // 1-date created
        // 8- source (platform)
        // 17- status (reffered-on...)
        //127 - type of injury (cat..)
        //129 - user
        var body = { "from": "bsckevgt3", "select": [1, 8, 17, 127], "where": "{'1'.OAF.'" + quickDayStart + "'}AND{'1'.OBF.'" + quickDayEnd + "'}", "groupBy": [{ "fieldId": 8, "grouping": "equal-values" }], "options": { "skip": 0, "compareWithAppLocalTime": false } }
        console.log(body);
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.responseType = 'json';
        xmlHttp.open('POST', 'https://api.quickbase.com/v1/records/query', true);
        for (const key in headers) {
            xmlHttp.setRequestHeader(key, headers[key]);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === XMLHttpRequest.DONE) {
                console.log(xmlHttp.response.data);
                let dataR1 = xmlHttp.response.data;
                if ((dataR1.length>0)) {
                    // if (dataR1.length>0){ typeof dataR1 != "undefined")
                    // let currentPlatform=dataR1[0].1.value;
                    let currentPlatform = dataR1[0][8].value;
                    let calls = 0;
                    let inOffice = 0;
                    let fl = 0;
                    let resultArray = [];
                    let i = 0;
                    let pending = 0;
                    let none = 0;
                    let soft = 0;
                    let si = 0;
                    let cat = 0;
                    let death = 0;
                    let totalcalls = dataR1.length;
                    let hour = 0;
                    let time = new Array(24).fill(0);
                    while (i < dataR1.length) {
                        if (currentPlatform === dataR1[i][8].value) {
                            calls++;
                            if (dataR1[i][17].value === 'In-Office') { inOffice++ }
                            if ((dataR1[i][17].value === 'Follow-up Lock-in')) { fl++ }
                            if ((dataR1[i][17].value === 'Pending')) { pending++ }
                            if (dataR1[i][127].value === 'None') { none++ }
                            if (dataR1[i][127].value === 'Soft Tissue') { soft++ }
                            if (dataR1[i][127].value === 'SI - Serious Injury') { si++ }
                            if (dataR1[i][127].value === 'CAT - Catastrophic') { cat++ }
                            if (dataR1[i][127].value === 'Death - Wrongful Death') { death++ }
                            hour = parseInt(dataR1[i][1].value.slice(11, 13));
                            time[hour] = time[hour] + 1;
                            let time2 = new Array(24).fill(0);
                            for (let j = 0; j < time.length; j++) {
                                time2[j] = time[j];
                            }
                            i++;
                            if (i === dataR1.length) {
                                resultArray.push({
                                    platform: currentPlatform, calls: calls,
                                    inOffice: inOffice, fl: fl, pending: pending, total: inOffice + fl + pending, closed: 0, conversion: 0,
                                    none: none, soft: soft, si: si, cat: cat, death: death, total2: soft + si + cat + death, dist: 0, conversion2: 0,
                                    time: time2
                                });
                            }
                        } else {
                            let time2 = new Array(24).fill(0);
                            for (let j = 0; j < time.length; j++) {
                                time2[j] = time[j];
                            }
                            resultArray.push({
                                platform: currentPlatform, calls: calls,
                                inOffice: inOffice, fl: fl, pending: pending, total: inOffice + fl + pending, closed: 0, conversion: 0,
                                none: none, soft: soft, si: si, cat: cat, death: death, total2: soft + si + cat + death, dist: 0, conversion2: 0,
                                time: time2
                            });
                            currentPlatform = dataR1[i][8].value;
                            calls = 0;
                            inOffice = 0;
                            pending = 0;
                            none = 0;
                            soft = 0;
                            si = 0;
                            cat = 0;
                            death = 0;
                            fl=0;
                            time.fill(0);

                        }
                    }
                    let totoalSum = 0; let totalSum2 = 0;
                    resultArray.map((element) => { totoalSum = totoalSum + element.total; totalSum2 = totalSum2 + element.total2 });
                    resultArray.map((element) => {
                        element.closed = (element.total * 100 / totoalSum).toFixed(2);
                        element.conversion = (element.total * 100 / element.calls).toFixed(2);
                        element.dist = (element.total2 * 100 / totalSum2).toFixed(2);
                        element.conversion2 = (element.total2 * 100 / element.calls).toFixed(2);
                    });
                    setDataState(resultArray);
                    console.log(resultArray);
                    console.log(parseInt(('2022-04-18T09:06:29Z').slice(11, 13)));
                }
            }
        };


        xmlHttp.send(JSON.stringify(body));;
    }, [rangeState]);

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
                {record.inOffice > 0 ? <td>{record.inOffice}</td> : <td></td>}
                {record.fl > 0 ? <td>{record.fl}</td> : <td></td>}
                {record.pending > 0 ? <td>{record.pending}</td> : <td></td>}
                {record.total > 0 ? <td>{record.total}</td> : <td></td>}
                {record.closed > 0 ? <td>{record.closed}%</td> : <td></td>}
                {record.conversion > 0 ? <td>{record.conversion}%</td> : <td></td>}
            </tr>);
        })

        return recordList;
    }
    function renderListing2() {
        let recordList = [];
        dataState.map(record => {

            recordList.push(<tr>
                <td>{record.platform}</td>
                <td>{record.calls}</td>
                {record.none > 0 ? <td>{record.none}</td> : <td></td>}
                {record.soft > 0 ? <td>{record.soft}</td> : <td></td>}
                {record.si > 0 ? <td>{record.si}</td> : <td></td>}
                {record.cat > 0 ? <td>{record.cat}</td> : <td></td>}
                {record.death > 0 ? <td>{record.death}</td> : <td></td>}
                {record.total2 > 0 ? <td>{record.total2}</td> : <td></td>}
                {record.dist > 0 ? <td>{record.dist}%</td> : <td></td>}
                {record.conversion2 > 0 ? <td>{record.conversion2}%</td> : <td></td>}

            </tr>);
        })

        return recordList;
    }
    function renderListingTime() {
        let recordList = [];


        dataState.map(record => {

            recordList.push(<tr>
                <td>{record.platform}</td>

                {record.time[12] > 0 ? <td>{record.time[12]}</td> : <td></td>}
                {record.time[13] > 0 ? <td>{record.time[13]}</td> : <td></td>}
                {record.time[14] > 0 ? <td>{record.time[14]}</td> : <td></td>}
                {record.time[15] > 0 ? <td>{record.time[15]}</td> : <td></td>}
                {record.time[16] > 0 ? <td>{record.time[16]}</td> : <td></td>}
                {record.time[17] > 0 ? <td>{record.time[17]}</td> : <td></td>}
                {record.time[18] > 0 ? <td>{record.time[18]}</td> : <td></td>}
                {record.time[19] > 0 ? <td>{record.time[19]}</td> : <td></td>}
                {record.time[20] > 0 ? <td>{record.time[20]}</td> : <td></td>}
                {record.time[21] > 0 ? <td>{record.time[21]}</td> : <td></td>}
                {record.time[22] > 0 ? <td>{record.time[22]}</td> : <td></td>}
                {record.time[23] > 0 ? <td>{record.time[23]}</td> : <td></td>}
                {record.time[0] > 0 ? <td>{record.time[0]}</td> : <td></td>}
                {record.time[1] > 0 ? <td>{record.time[1]}</td> : <td></td>}
                {record.time[2] > 0 ? <td>{record.time[2]}</td> : <td></td>}
                {record.time[3] > 0 ? <td>{record.time[3]}</td> : <td></td>}
                {record.time[4] > 0 ? <td>{record.time[4]}</td> : <td></td>}
                {record.time[5] > 0 ? <td>{record.time[5]}</td> : <td></td>}
                {record.time[6] > 0 ? <td>{record.time[6]}</td> : <td></td>}
                {record.time[7] > 0 ? <td>{record.time[7]}</td> : <td></td>}
                {record.time[8] > 0 ? <td>{record.time[8]}</td> : <td></td>}
                {record.time[9] > 0 ? <td>{record.time[9]}</td> : <td></td>}
                {record.time[10] > 0 ? <td>{record.time[10]}</td> : <td></td>}
                {record.time[11] > 0 ? <td>{record.time[11]}</td> : <td></td>}


            </tr>);
        })

        return recordList;
    }

    function renderTotal1() {
        let recordList = [];
        let tcalls = 0;
        let tinOffice = 0;
        let tfl = 0;
        let tpending = 0;
        let ttotal = 0;


        dataState.map(record => {
            tcalls = tcalls + record.calls;
            tinOffice = tinOffice + record.inOffice;
            tfl = tfl + record.fl;
            tpending = tpending + record.pending;
            ttotal = ttotal + record.total;
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

    function renderTotal2() {
        let recordList = [];
        let tcalls = 0;
        let tnone = 0;
        let tsoft = 0;
        let tsi = 0;
        let tcat = 0;
        let tdeath = 0;
        let ttotal = 0;


        dataState.map(record => {
            tcalls = tcalls + record.calls;
            tnone = tnone + record.none;
            tsoft = tsoft + record.soft;
            tsi = tsi + record.si;
            tcat = tcat + record.cat;
            tdeath = tdeath + record.death;
            ttotal = ttotal + record.total2;
        })



        return (
            <tr className="font-weight-bold">
                <td >Total</td>
                <td>{tcalls}</td>
                <td>{tnone}</td>
                <td>{tsoft}</td>
                <td>{tsi}</td>
                <td>{tcat}</td>
                <td>{tdeath}</td>
                <td>{ttotal}</td>
                <td></td>
                <td></td>
            </tr>

        );
    }

    function renderTotal3() {
        let recordList = [];
        let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0, c7 = 0, c8 = 0, c9 = 0, c10 = 0, c11 = 0, c12 = 0,
            c13 = 0, c14 = 0, c15 = 0, c16 = 0, c17 = 0, c18 = 0, c19 = 0, c20 = 0, c21 = 0, c22 = 0, c23 = 0, c24 = 0;



        dataState.map(record => {
            c1 = c1 + record.time[12]; c2 = c2 + record.time[13]; c3 = c3 + record.time[14];
            c4 = c4 + record.time[15]; c5 = c5 + record.time[16]; c6 = c6 + record.time[17];
            c7 = c7 + record.time[18]; c8 = c8 + record.time[19]; c9 = c9 + record.time[20];
            c10 = c10 + record.time[21]; c11 = c11 + record.time[22]; c12 = c12 + record.time[23];
            c13 = c13 + record.time[0]; c14 = c14 + record.time[1]; c15 = c15 + record.time[2];
            c16 = c16 + record.time[3]; c17 = c17 + record.time[4]; c18 = c18 + record.time[5];
            c19 = c19 + record.time[6]; c20 = c20 + record.time[7]; c21 = c21 + record.time[8];
            c22 = c22 + record.time[9]; c23 = c23 + record.time[10]; c24 = c24 + record.time[11];

        })



        return (
            <tr className="font-weight-bold">
                <td >Total</td>
                <td>{c1}</td><td>{c2}</td><td>{c3}</td><td>{c4}</td><td>{c5}</td><td>{c6}</td>
                <td>{c7}</td><td>{c8}</td><td>{c9}</td><td>{c10}</td><td>{c11}</td><td>{c12}</td>
                <td>{c13}</td><td>{c14}</td><td>{c15}</td><td>{c16}</td><td>{c17}</td><td>{c18}</td>
                <td>{c19}</td><td>{c20}</td><td>{c21}</td><td>{c22}</td><td>{c23}</td><td>{c24}</td>

            </tr>

        );
    }




    const handleChange = event => {
        const { name, value } = event.target;
        console.log(name + " " + value);
        setRangeState({
            ...rangeState,
            [name]: value

        });

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
                                                                {renderListing2()}
                                                                {renderTotal2()}
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
                                                                {renderListingTime()}
                                                                {renderTotal3()}
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
