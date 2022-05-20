import React, { useState, useEffect } from 'react';
import { QUERY_ME } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_STUDENT, ADD_EVENT } from '../../utils/mutations';
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
    const [reportMarket, setReportMarket] = useState([{ user: "", calls: 0 }]);
    const [rangeState, setRangeState] = useState({ dayStart: priorDate, dayEnd: today });
    const [updateUser] = useMutation(UPDATE_USER);
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
        // 8- source (user)
        // 17- status (reffered-on...)
        //127 - type of injury (cat..)
        //129 - user
        var body = { "from": "bsckevgt3", "select": [1, 129, 17, 127], "where": "{'1'.OAF.'" + quickDayStart + "'}AND{'1'.OBF.'" + quickDayEnd + "'}", "groupBy": [{ "fieldId": 129, "grouping": "equal-values" }], "options": { "skip": 0, "compareWithAppLocalTime": false } }
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
                    // let currentuser=dataR1[0].1.value;
                    
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
                    let ng=0, refout=0,cool=0, fallout=0, fdocs=0, finj=0;
                    let v1=0,v2=0,v3=0,v4=0,v5=0,v6=0,v7=0,v8=0,v9=0,v10=0,
                    v11=0,v12=0,v13=0,v14=0,v15=0,v16=0,v17=0,v18=0,v19=0,v20=0,
                    v21=0,v22=0,v23=0,v24=0,v25=0,v26=0,v27=0,v28=0,v29=0,v30=0,
                    v31=0,v32=0,v33=0,v34=0,v35=0,v36=0,v37=0,v38=0,v39=0,v40=0,
                    v41=0,v42=0,v43=0,v44=0,v45=0;
                    let currentuser="";
                    if (dataR1[0][129].value==null){
                        while (dataR1[i][129].value==null){
                            i++;
                        }

                    }
                    if (i<dataR1.length){
                        currentuser = dataR1[i][129].value.name;}
                    while (i < dataR1.length) {
                        if (currentuser === dataR1[i][129].value.name) {
                            calls++;
                            if (dataR1[i][17].value === 'In-Office') { inOffice++ }
                            if ((dataR1[i][17].value === 'Follow-up Lock-in')) { fl++ }
                            if ((dataR1[i][17].value === 'Pending')) { pending++ }
                            if ((dataR1[i][17].value === 'No-go')) { ng++ }
                            if ((dataR1[i][17].value === 'Referred Out')) { refout++ }
                            if ((dataR1[i][17].value === 'Cooling Off')) { cool++ }
                            if ((dataR1[i][17].value === 'Fallout')) { fallout++ }
                            if ((dataR1[i][17].value === 'Follow- Docs Req')) { fdocs++ }
                            if ((dataR1[i][17].value === 'Follow-up Injuries')) { finj++ }

                            if (dataR1[i][127].value === 'None') { none++ }
                            if (dataR1[i][127].value === 'Soft Tissue') { soft++ }
                            if (dataR1[i][127].value === 'SI - Serious Injury') { si++ }
                            if (dataR1[i][127].value === 'CAT - Catastrophic') { cat++ }
                            if (dataR1[i][127].value === 'Death - Wrongful Death') { death++ }

                            if ((dataR1[i][17].value === 'In-Office')&(dataR1[i][127].value === 'Soft Tissue')) { v1++ };
                            if ((dataR1[i][17].value === 'Follow-up Lock-in')&(dataR1[i][127].value === 'Soft Tissue')) { v2++ };
                            if ((dataR1[i][17].value === 'Pending')&(dataR1[i][127].value === 'Soft Tissue')) { v3++ };
                            if ((dataR1[i][17].value === 'No-go')&(dataR1[i][127].value === 'Soft Tissue')) { v4++ };
                            if ((dataR1[i][17].value === 'Referred Out')&(dataR1[i][127].value === 'Soft Tissue')) { v5++ };
                            if ((dataR1[i][17].value === 'Cooling Off')&(dataR1[i][127].value === 'Soft Tissue')) { v6++ };
                            if ((dataR1[i][17].value === 'Fallout')&(dataR1[i][127].value === 'Soft Tissue')) { v7++ };
                            if ((dataR1[i][17].value === 'Follow- Docs Req')&(dataR1[i][127].value === 'Soft Tissue')) { v8++ };
                            if ((dataR1[i][17].value === 'Follow-up Injuries')&(dataR1[i][127].value === 'Soft Tissue')) { v9++ };

                            if ((dataR1[i][17].value === 'In-Office')&(dataR1[i][127].value === 'SI - Serious Injury')) { v10++ };
                            if ((dataR1[i][17].value === 'Follow-up Lock-in')&(dataR1[i][127].value === 'SI - Serious Injury')) { v11++ };
                            if ((dataR1[i][17].value === 'Pending')&(dataR1[i][127].value === 'SI - Serious Injury')) { v12++ };
                            if ((dataR1[i][17].value === 'No-go')&(dataR1[i][127].value === 'SI - Serious Injury')) { v13++ };
                            if ((dataR1[i][17].value === 'Referred Out')&(dataR1[i][127].value === 'SI - Serious Injury')) { v14++ };
                            if ((dataR1[i][17].value === 'Cooling Off')&(dataR1[i][127].value === 'SI - Serious Injury')) { v15++ };
                            if ((dataR1[i][17].value === 'Fallout')&(dataR1[i][127].value === 'SI - Serious Injury')) { v16++ };
                            if ((dataR1[i][17].value === 'Follow- Docs Req')&(dataR1[i][127].value === 'SI - Serious Injury')) { v17++ };
                            if ((dataR1[i][17].value === 'Follow-up Injuries')&(dataR1[i][127].value === 'SI - Serious Injury')) { v18++ };
                            
                            if ((dataR1[i][17].value === 'In-Office')&(dataR1[i][127].value === 'None')) { v19++ };
                            if ((dataR1[i][17].value === 'Follow-up Lock-in')&(dataR1[i][127].value === 'None')) { v20++ };
                            if ((dataR1[i][17].value === 'Pending')&(dataR1[i][127].value === 'None')) { v21++ };
                            if ((dataR1[i][17].value === 'No-go')&(dataR1[i][127].value === 'None')) { v22++ };
                            if ((dataR1[i][17].value === 'Referred Out')&(dataR1[i][127].value === 'None')) { v23++ };
                            if ((dataR1[i][17].value === 'Cooling Off')&(dataR1[i][127].value === 'None')) { v24++ };
                            if ((dataR1[i][17].value === 'Fallout')&(dataR1[i][127].value === 'None')) { v25++ };
                            if ((dataR1[i][17].value === 'Follow- Docs Req')&(dataR1[i][127].value === 'None')) { v26++ };
                            if ((dataR1[i][17].value === 'Follow-up Injuries')&(dataR1[i][127].value === 'None')) { v27++ };

                            if ((dataR1[i][17].value === 'In-Office')&(dataR1[i][127].value === 'Death - Wrongful Death')) { v28++ };
                            if ((dataR1[i][17].value === 'Follow-up Lock-in')&(dataR1[i][127].value === 'Death - Wrongful Death')) { v29++ };
                            if ((dataR1[i][17].value === 'Pending')&(dataR1[i][127].value === 'Death - Wrongful Death')) { v30++ };
                            if ((dataR1[i][17].value === 'No-go')&(dataR1[i][127].value === 'Death - Wrongful Death')) { v31++ };
                            if ((dataR1[i][17].value === 'Referred Out')&(dataR1[i][127].value === 'Death - Wrongful Death')) { v32++ };
                            if ((dataR1[i][17].value === 'Cooling Off')&(dataR1[i][127].value === 'Death - Wrongful Death')) { v33++ };
                            if ((dataR1[i][17].value === 'Fallout')&(dataR1[i][127].value === 'Death - Wrongful Death')) { v34++ };
                            if ((dataR1[i][17].value === 'Follow- Docs Req')&(dataR1[i][127].value === 'Death - Wrongful Death')) { v35++ };
                            if ((dataR1[i][17].value === 'Follow-up Injuries')&(dataR1[i][127].value === 'Death - Wrongful Death')) { v36++ };

                            if ((dataR1[i][17].value === 'In-Office')&(dataR1[i][127].value === 'CAT - Catastrophic')) { v37++ };
                            if ((dataR1[i][17].value === 'Follow-up Lock-in')&(dataR1[i][127].value === 'CAT - Catastrophic')) { v38++ };
                            if ((dataR1[i][17].value === 'Pending')&(dataR1[i][127].value === 'CAT - Catastrophic')) { v39++ };
                            if ((dataR1[i][17].value === 'No-go')&(dataR1[i][127].value === 'CAT - Catastrophic')) { v40++ };
                            if ((dataR1[i][17].value === 'Referred Out')&(dataR1[i][127].value === 'CAT - Catastrophic')) { v41++ };
                            if ((dataR1[i][17].value === 'Cooling Off')&(dataR1[i][127].value === 'CAT - Catastrophic')) { v42++ };
                            if ((dataR1[i][17].value === 'Fallout')&(dataR1[i][127].value === 'CAT - Catastrophic')) { v43++ };
                            if ((dataR1[i][17].value === 'Follow- Docs Req')&(dataR1[i][127].value === 'CAT - Catastrophic')) { v44++ };
                            if ((dataR1[i][17].value === 'Follow-up Injuries')&(dataR1[i][127].value === 'CAT - Catastrophic')) { v45++ };
                         
                            i++;
                            if (i === dataR1.length) {
                                resultArray.push({
                                    user: currentuser, calls: calls,
                                    inOffice: inOffice, fl: fl, pending: pending, total: inOffice + fl + pending, closed: 0, conversion: 0,
                                    none: none, soft: soft, si: si, cat: cat, death: death, total2: soft + si + cat + death, dist: 0, conversion2: 0,
                                    ng:ng ,refout:refout, cool:cool, fallout:fallout, fdocs:fdocs, finj:finj, total3:ng+refout+cool+fallout+ fdocs+finj,
                                    undist:0, conversion3:0,
                                    v1:v1,v2:v2,v3:v3,v4:v4,v5:v5,v6:v6,v7:v7,v8:v8,v9:v9,v10:v10,
                                    v11:v11,v12:v12,v13:v13,v14:v14,v15:v15,v16:v16,v17:v17,v18:v18,v19:v19,v20:v20,
                                    v21:v21,v22:v22,v23:v23,v24:v24,v25:v25,v26:v26,v27:v27,v28:v28,v29:v29,v30:v30,
                                    v31:v31,v32:v32,v33:v33,v34:v34,v35:v35,v36:v36,v37:v37,v38:v38,v39:v39,v40:v40,
                                    v41:v41,v42:v42,v43:v43,v44:v44,v45:v45,vtotalSum1:v1+v2+v3+v10+v11+v12+v19+v20+v21+
                                    v28+v29+v37+v38+v39, vtotalSum2:v4+v5+v6+v7+v8+v9+v13+v14+v15+v16+v17+v18+v22+v23+v24+v25+v26+v27+
                                    v31+v32+v33+v34+v35+v36+v40+v41+v42+v43+v44+v45,
                                    sumf1:v1+v2+v3, sums1:v4+v5+v6+v7+v8+v9,sumf2:v10+v11+v12, sums2:v13+v14+v15+v16+v17+v18,
                                    sumf3:v19+v20+v21, sums3:v22+v23+v24+v25+v26+v27,sumf4:v28+v29+v30, sums4:v31+v32+v33+v34+v35+v36,
                                    sumf5:v37+v38+v39, sums5:v40+v41+v42+v43+v44+v45
        
                                });
                            }
                        } else {
                         
                            resultArray.push({
                                user: currentuser, calls: calls,
                                inOffice: inOffice, fl: fl, pending: pending, total: inOffice + fl + pending, closed: 0, conversion: 0,
                                none: none, soft: soft, si: si, cat: cat, death: death, total2: soft + si + cat + death, dist: 0, conversion2: 0,
                                ng:ng ,refout:refout, cool:cool, fallout:fallout, fdocs:fdocs, finj:finj,total3:ng+refout+cool+fallout+ fdocs+finj,
                                undist:0, conversion3:0,
                                v1:v1,v2:v2,v3:v3,v4:v4,v5:v5,v6:v6,v7:v7,v8:v8,v9:v9,v10:v10,
                                v11:v11,v12:v12,v13:v13,v14:v14,v15:v15,v16:v16,v17:v17,v18:v18,v19:v19,v20:v20,
                                v21:v21,v22:v22,v23:v23,v24:v24,v25:v25,v26:v26,v27:v27,v28:v28,v29:v29,v30:v30,
                                v31:v31,v32:v32,v33:v33,v34:v34,v35:v35,v36:v36,v37:v37,v38:v38,v39:v39,v40:v40,
                                v41:v41,v42:v42,v43:v43,v44:v44,v45:v45,
                                vtotalSum1:v1+v2+v3+v10+v11+v12+v19+v20+v21+
                                    v28+v29+v37+v38+v39,
                                    vtotalSum2:v4+v5+v6+v7+v8+v9+v13+v14+v15+v16+v17+v18+v22+v23+v24+v25+v26+v27+
                                    v31+v32+v33+v34+v35+v36+v40+v41+v42+v43+v44+v45,
                                    sumf1:v1+v2+v3, sums1:v4+v5+v6+v7+v8+v9,sumf2:v10+v11+v12, sums2:v13+v14+v15+v16+v17+v18,
                                    sumf3:v19+v20+v21, sums3:v22+v23+v24+v25+v26+v27,sumf4:v28+v29+v30, sums4:v31+v32+v33+v34+v35+v36,
                                    sumf5:v37+v38+v39, sums5:v40+v41+v42+v43+v44+v45
                              
                            });
                            currentuser = dataR1[i][129].value.name;
                            calls = 0;
                            inOffice = 0;
                            pending = 0;
                            none = 0;
                            soft = 0;
                            si = 0;
                            cat = 0;
                            death = 0;
                            fl=0;
                            ng=0; refout=0;cool=0; fallout=0; fdocs=0; finj=0;

                            v1=0;v2=0;v3=0;v4=0;v5=0;v6=0;v7=0;v8=0;v9=0;v10=0;
                    v11=0;v12=0;v13=0;v14=0;v15=0;v16=0;v17=0;v18=0;v19=0;v20=0;
                    v21=0;v22=0;v23=0;v24=0;v25=0;v26=0;v27=0;v28=0;v29=0;v30=0;
                    v31=0;v32=0;v33=0;v34=0;v35=0;v36=0;v37=0;v38=0;v39=0;v40=0;
                    v41=0;v42=0;v43=0;v44=0;v45=0;
                          

                        }
                    }
                    let totoalSum = 0; let totalSum2 = 0; let totalSum3=0;
                    resultArray.map((element) => { totoalSum = totoalSum + element.total; totalSum2 = totalSum2 + element.total2;
                         totalSum3= totalSum3+ element.total3});
                    resultArray.map((element) => {
                        element.closed = (element.total * 100 / totoalSum).toFixed(2);
                        element.conversion = (element.total * 100 / element.calls).toFixed(2);
                        element.dist = (element.total2 * 100 / totalSum2).toFixed(2);
                        element.conversion2 = (element.total2 * 100 / element.calls).toFixed(2);
                        element.undist = (element.total3 * 100 / totalSum3).toFixed(2);
                        element.conversion3 = (element.total *100/ (element.calls-element.total3)).toFixed(2);
                    });
                    setDataState(resultArray);
                    console.log(resultArray);
                    
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
                <td className="one-line">{record.user}</td>
                <td>{record.calls}</td>
                {record.inOffice > 0 ? <td>{record.inOffice}</td> : <td></td>}
                {record.fl > 0 ? <td>{record.fl}</td> : <td></td>}
                {record.pending > 0 ? <td>{record.pending}</td> : <td></td>}
                {record.total > 0 ? <td>{record.total}</td> : <td></td>}
                {record.closed > 0 ? <td>{record.closed}%</td> : <td></td>}
                {record.conversion > 0 ? <td>{record.conversion}%</td> : <td></td>}
               

                {record.ng > 0 ? <td >{record.ng}</td> : <td></td>}
                {record.refout > 0 ? <td>{record.refout}</td> : <td></td>}
                {record.cool > 0 ? <td>{record.cool}</td> : <td></td>}
                {record.fallout > 0 ? <td>{record.fallout}</td> : <td></td>}
                {record.fdocs > 0 ? <td>{record.fdocs}</td> : <td></td>}
                {record.finj > 0 ? <td>{record.finj}</td> : <td></td>}
                {record.total3 > 0 ? <td>{record.total3}</td> : <td></td>}
                {record.undist > 0 ? <td>{record.undist}%</td> : <td></td>}
                {record.conversion3 > 0 ? <td>{record.conversion3}%</td> : <td></td>}
            </tr>);
        })

        return recordList;
    }
    function renderListingUser() {
        let recordList = [];
        dataState.map(record => {
            if ((record.soft+record.si+record.none+record.death+record.cat)>0){

            recordList.push( <Col md="12">
            <Card className="strpied-tabled-with-hover">
                <Card.Header>
                    <Card.Title as="h4">{record.user}</Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                    <Table  bordered hover>
                        <thead>
                            <tr>
                                <th className="border-0 text-center one-line">Type of Injury</th>
                                <th className="border-0 text-center">Calls Rece ived</th>
                                <th className="border-0 text-center">In-Office</th>
                                <th className="border-0 text-center">Follow-up Lock-in</th>
                                <th className="border-0 text-center">Pen ding</th>
                                <th className="border-0 text-center">Total</th>
                                <th className="border-0 text-center">Cases Closed Distri bution</th>
                                <th className="border-0 text-center ">Conver sion Rate</th>
                                <th className="border border-dark border-right-0 border-bottom-0 border-top-0 text-center ">No-go</th>
                                <th className="border-0 text-center">Refer red Out</th>
                                <th className="border-0 text-center">Cooling Off</th>
                                <th className="border-0 text-center">Fallout</th>
                                <th className="border-0 text-center">Follow- Docs Req</th>
                                <th className="border-0 text-center">Follow-up Injuriest</th>
                                <th className="border-0 text-center">Total</th>
                                <th className="border-0 text-center">Unserv iceable Distri bution</th>
                                <th className="border-0 text-center">Conver sion Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td className="one-line">Soft Tissue</td>
                               
                                {record.soft > 0 ? <td >{record.soft}</td> : <td></td>}
                                {record.v1 > 0 ? <td >{record.v1}</td> : <td></td>}
                                {record.v2 > 0 ? <td >{record.v2}</td> : <td></td>}
                                {record.v3 > 0 ? <td >{record.v3}</td> : <td></td>}
                                {record.sumf1 > 0 ? <td >{record.sumf1}</td> : <td></td>}
                                {(record.sumf1 * 100 / record.vtotalSum1) > 0 ? <td >{(record.sumf1 * 100 / record.vtotalSum1).toFixed(2)}%</td> : <td></td>}
                                {record.sumf1*100/record.soft > 0 ? <td >{(record.sumf1*100/record.soft).toFixed(2)}%</td> : <td></td>}                         
                                {record.v4 > 0 ? <td >{record.v4}</td> : <td></td>}
                                {record.v5 > 0 ? <td >{record.v5}</td> : <td></td>}
                                {record.v6 > 0 ? <td >{record.v6}</td> : <td></td>}
                                {record.v7 > 0 ? <td >{record.v7}</td> : <td></td>}
                                {record.v8 > 0 ? <td >{record.v8}</td> : <td></td>}
                                {record.v9 > 0 ? <td >{record.v9}</td> : <td></td>}
                                {record.sums1 > 0 ? <td >{record.sums1}</td> : <td></td>}
                                {(record.sums1 * 100 / record.vtotalSum2) > 0 ? <td >{(record.sums1 * 100 / record.vtotalSum2).toFixed(2)}%</td> : <td></td>}
                                {record.sumf1/(record.soft-record.sums1) > 0 ? <td >{((record.sumf1*100)/(record.soft-record.sums1)).toFixed(2)}%</td> : <td></td>}
                            </tr>  
                            <tr>
                                <td className="one-line">SI - Serious Injury</td>
                               
                                {record.si > 0 ? <td >{record.si}</td> : <td></td>}
                                {record.v10 > 0 ? <td >{record.v10}</td> : <td></td>}
                                {record.v11 > 0 ? <td >{record.v11}</td> : <td></td>}
                                {record.v12 > 0 ? <td >{record.v12}</td> : <td></td>}
                                {record.sumf2 > 0 ? <td >{record.sumf2}</td> : <td></td>}
                                {(record.sumf2 * 100 / record.vtotalSum1) > 0 ? <td >{(record.sumf2 * 100 / record.vtotalSum1).toFixed(2)}%</td> : <td></td>}
                                {record.sumf2*100/record.soft > 0 ? <td >{(record.sumf2*100/record.si).toFixed(2)}%</td> : <td></td>}                         
                                {record.v13 > 0 ? <td >{record.v13}</td> : <td></td>}
                                {record.v14 > 0 ? <td >{record.v14}</td> : <td></td>}
                                {record.v15 > 0 ? <td >{record.v15}</td> : <td></td>}
                                {record.v16 > 0 ? <td >{record.v16}</td> : <td></td>}
                                {record.v17 > 0 ? <td >{record.v17}</td> : <td></td>}
                                {record.v18 > 0 ? <td >{record.v17}</td> : <td></td>}
                                {record.sums2 > 0 ? <td >{record.sums2}</td> : <td></td>}
                                {(record.sums2 * 100 / record.vtotalSum2) > 0 ? <td >{(record.sums2 * 100 / record.vtotalSum2).toFixed(2)}%</td> : <td></td>}
                                {record.sumf2/(record.soft-record.sums2) > 0 ? <td >{((record.sumf2*100)/(record.si-record.sums2)).toFixed(2)}%</td> : <td></td>}
                            </tr> 
                            <tr>
                                <td className="one-line">None</td>
                               
                                {record.none > 0 ? <td >{record.none}</td> : <td></td>}
                                {record.v19 > 0 ? <td >{record.v19}</td> : <td></td>}
                                {record.v20 > 0 ? <td >{record.v20}</td> : <td></td>}
                                {record.v21 > 0 ? <td >{record.v21}</td> : <td></td>}
                                {record.sumf3 > 0 ? <td >{record.sumf3}</td> : <td></td>}
                                {(record.sumf3 * 100 / record.vtotalSum1) > 0 ? <td >{(record.sumf3 * 100 / record.vtotalSum1).toFixed(2)}%</td> : <td></td>}
                                {record.sumf3*100/record.none > 0 ? <td >{(record.sumf3*100/record.none).toFixed(2)}%</td> : <td></td>}                         
                                {record.v22 > 0 ? <td >{record.v22}</td> : <td></td>}
                                {record.v23 > 0 ? <td >{record.v23}</td> : <td></td>}
                                {record.v24 > 0 ? <td >{record.v24}</td> : <td></td>}
                                {record.v25 > 0 ? <td >{record.v25}</td> : <td></td>}
                                {record.v26 > 0 ? <td >{record.v26}</td> : <td></td>}
                                {record.v27 > 0 ? <td >{record.v27}</td> : <td></td>}
                                {record.sums3 > 0 ? <td >{record.sums3}</td> : <td></td>}
                                {(record.sums3 * 100 / record.vtotalSum2) > 0 ? <td >{(record.sums3 * 100 / record.vtotalSum2).toFixed(2)}%</td> : <td></td>}
                                {record.sumf3/(record.none-record.sums3) > 0 ? <td >{(record.sumf3/(record.none-record.sums3)).toFixed(2)}%</td> : <td></td>}
                            </tr> 
                            <tr>
                                <td className="one-line">Death - Wrongful Death</td>
                               
                                {record.death> 0 ? <td >{record.death}</td> : <td></td>}
                                {record.v28 > 0 ? <td >{record.v28}</td> : <td></td>}
                                {record.v29 > 0 ? <td >{record.v29}</td> : <td></td>}
                                {record.v30 > 0 ? <td >{record.v30}</td> : <td></td>}
                                {record.sumf4 > 0 ? <td >{record.sumf4}</td> : <td></td>}
                                {(record.sumf4 * 100 / record.vtotalSum1) > 0 ? <td >{(record.sumf4 * 100 / record.vtotalSum1).toFixed(2)}%</td> : <td></td>}
                                {record.sumf4*100/record.death > 0 ? <td >{(record.sumf4*100/record.death).toFixed(2)}%</td> : <td></td>}                         
                                {record.v31 > 0 ? <td >{record.v31}</td> : <td></td>}
                                {record.v32 > 0 ? <td >{record.v32}</td> : <td></td>}
                                {record.v33 > 0 ? <td >{record.v33}</td> : <td></td>}
                                {record.v34 > 0 ? <td >{record.v34}</td> : <td></td>}
                                {record.v35 > 0 ? <td >{record.v35}</td> : <td></td>}
                                {record.v36 > 0 ? <td >{record.v36}</td> : <td></td>}
                                {record.sums4 > 0 ? <td >{record.sums4}</td> : <td></td>}
                                {(record.sums4 * 100 / record.vtotalSum2) > 0 ? <td >{(record.sums4 * 100 / record.vtotalSum2).toFixed(2)}%</td> : <td></td>}
                                {record.sumf4/(record.death-record.sums4) > 0 ? <td >{(record.sumf4/(record.death-record.sums4)).toFixed(2)}%</td> : <td></td>}
                            </tr> 
                            <tr >
                                <td >CAT - Catastrophic</td>
                               
                                {record.cat> 0 ? <td >{record.cat}</td> : <td></td>}
                                {record.v37> 0 ? <td >{record.v37}</td> : <td></td>}
                                {record.v38 > 0 ? <td >{record.v38}</td> : <td></td>}
                                {record.v39 > 0 ? <td >{record.v39}</td> : <td></td>}
                                {record.sumf5 > 0 ? <td >{record.sumf5}</td> : <td></td>}
                                {(record.sumf5 * 100 / record.vtotalSum1) > 0 ? <td >{(record.sumf5 * 100 / record.vtotalSum1).toFixed(2)}%</td> : <td></td>}
                                {record.sumf5*100/record.cat > 0 ? <td >{(record.sumf5*100/record.cat).toFixed(2)}%</td> : <td></td>}                         
                                {record.v40 > 0 ? <td >{record.v40}</td> : <td></td>}
                                {record.v41 > 0 ? <td >{record.v41}</td> : <td></td>}
                                {record.v42 > 0 ? <td >{record.v42}</td> : <td></td>}
                                {record.v43 > 0 ? <td >{record.v43}</td> : <td></td>}
                                {record.v44 > 0 ? <td >{record.v44}</td> : <td></td>}
                                {record.v45 > 0 ? <td >{record.v45}</td> : <td></td>}
                                {record.sums5 > 0 ? <td >{record.sums5}</td> : <td></td>}
                                {(record.sums5 * 100 / record.vtotalSum2) > 0 ? <td >{(record.sums5 * 100 / record.vtotalSum2).toFixed(2)}%</td> : <td></td>}
                                {record.sumf5/(record.cat-record.sums5) > 0 ? <td >{(record.sumf5/(record.cat-record.sums5)).toFixed(2)}%</td> : <td></td>}
                            </tr> 
                            <tr className="font-weight-bold table-secondary">
                                <td >Total</td>
                               
                                 <td>{record.soft+record.si+record.none+record.death+record.cat}</td>
                                 
                                {(record.v1+record.v10+record.v19+record.v28+record.v37)> 0 ? <td >{record.v1+record.v10+record.v19+record.v28+record.v37}</td> : <td></td>}
                                {(record.v2+record.v11+record.v20+record.v29+record.v38)> 0 ? <td >{record.v2+record.v11+record.v20+record.v29+record.v38}</td> : <td></td>}
                                {(record.v3+record.v12+record.v21+record.v30+record.v39)> 0 ? <td >{record.v3+record.v12+record.v21+record.v30+record.v39}</td> : <td></td>}
                                {record.vtotalSum1 > 0 ? <td >{record.vtotalSum1}</td> : <td></td>}
                                 <td></td>
                                <td></td>
                                {(record.v4+record.v13+record.v22+record.v31+record.v40)> 0 ? <td >{record.v4+record.v13+record.v22+record.v31+record.v40}</td> : <td></td>}  
                                {(record.v5+record.v14+record.v23+record.v32+record.v41)> 0 ? <td >{record.v5+record.v14+record.v23+record.v32+record.v41}</td> : <td></td>} 
                                {(record.v6+record.v15+record.v24+record.v33+record.v42)> 0 ? <td >{record.v4+record.v15+record.v24+record.v33+record.v42}</td> : <td></td>} 
                                {(record.v7+record.v16+record.v25+record.v34+record.v43)> 0 ? <td >{record.v7+record.v16+record.v25+record.v34+record.v43}</td> : <td></td>} 
                                {(record.v8+record.v17+record.v26+record.v35+record.v44)> 0 ? <td >{record.v8+record.v17+record.v26+record.v35+record.v44}</td> : <td></td>} 
                                {(record.v9+record.v18+record.v27+record.v36+record.v45)> 0 ? <td >{record.v9+record.v18+record.v27+record.v36+record.v45}</td> : <td></td>} 
                                {record.vtotalSum2 > 0 ? <td >{record.vtotalSum2}</td> : <td></td>}                 
                                <td></td>
                                <td></td>
                            </tr> 
                            
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Col>
        
        
        );
            }
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
        let ng=0, refout=0, cool=0, fallout=0, fdocs=0, finj=0, total=0;

        dataState.map(record => {
            tcalls = tcalls + record.calls;
            tinOffice = tinOffice + record.inOffice;
            tfl = tfl + record.fl;
            tpending = tpending + record.pending;
            ttotal = ttotal + record.total;
            ng=ng+record.ng;
            refout=refout+record.refout;
            cool=cool+record.cool;
            fallout=fallout+record.fallout;
            fdocs=fdocs+record.fdocs;
            finj=finj+record.finj;
            total=total+record.total3;
            
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
                <td >{ng}</td>
                <td>{refout}</td>
                <td>{cool}</td>
                <td>{fallout}</td>
                <td>{fdocs}</td>
                <td>{finj}</td>
                <td>{total}</td>
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
                            <h3>Intakes Members</h3>
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
                                                        <Card.Title as="h4">Marketing user</Card.Title>
                                                        <p className="card-category">
                                                            Here is a subtitle for this table
                                                        </p>
                                                    </Card.Header>
                                                    <Card.Body className="table-full-width table-responsive px-0">
                                                        <Table striped bordered hover>
                                                            <thead>
                                                                <tr>

                                                                    <th className="border-0 text-center one-line">Member</th>
                                                                    <th className="border-0 text-center">Calls Rece ived</th>
                                                                    <th className="border-0 text-center">In-Office</th>
                                                                    <th className="border-0 text-center">Follow-up Lock-in</th>
                                                                    <th className="border-0 text-center">Pen ding</th>
                                                                    <th className="border-0 text-center">Total</th>
                                                                    <th className="border-0 text-center">Cases Closed Distri bution</th>
                                                                    <th className="border-0 text-center ">Conver sion Rate</th>
                                                                    <th className="border border-dark border-right-0 border-bottom-0 border-top-0 text-center ">No-go</th>
                                                                    <th className="border-0 text-center">Refer red Out</th>
                                                                    <th className="border-0 text-center">Cooling Off</th>
                                                                    <th className="border-0 text-center">Fallout</th>
                                                                    <th className="border-0 text-center">Follow- Docs Req</th>
                                                                    <th className="border-0 text-center">Follow-up Injuriest</th>
                                                                    <th className="border-0 text-center">Total</th>
                                                                    <th className="border-0 text-center">Unserv iceable Distri bution</th>
                                                                    <th className="border-0 text-center">Conver sion Rate</th>
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
                                          {renderListingUser()}
  
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