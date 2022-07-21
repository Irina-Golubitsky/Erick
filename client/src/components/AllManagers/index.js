import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { QUERY_ACTIVEMANAGERS } from '../../utils/queries';
import { REASSIGN_CASE } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Auth from '../../utils/auth';
import { ALL_PREFS } from '../../utils/queries';

import Hero from '../Hero'
import {
    Button,
    Table

} from "react-bootstrap";
import Header from '../Header';

import { event } from 'jquery';

const AllManagers = props => {
    const [userState, setuserState] = useState({ user: "" });
    const [prefsState, setprefsState] = useState({ showactive: [], showtransfer: [] });
    const [selectState, setselectState] = useState({ cases: [] });
    const [currentCategory, setCurrentCategory] = useState('Active');
    const [currentmanager, setCurrentManager] = useState('');


    const { loading, data } = useQuery(QUERY_ACTIVEMANAGERS, {
    });
    const { loading: loading2, data: data2 } = useQuery(ALL_PREFS, {
    });
    const [reassignCase, { error }] = useMutation(REASSIGN_CASE);
    useEffect(() => {
        if (typeof data !== "undefined") {
            console.log(data);

            setuserState({ user: data.activemanagers[0] });
        }
    }, [data]);
    useEffect(() => {
        if (typeof data2 !== "undefined") {
            setprefsState({ showactive: data2.preferences.showactive, showtransfer: data2.preferences.showtransfer })

        }
    }, [data2]);
    console.log(data2);

    const users = data?.activemanagers || [];
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
    const UserClicked = (index) => (event) => {

        setuserState({ user: data.activemanagers[index] });
        console.log(users[index].cases);
    }
    const handleChangeManager = event => {
        const { name, value } = event.target;
        setCurrentManager(value);


    }
    const ReassignCases = event => {
        event.preventDefault();
        console.log("hi reassign");
        selectState.cases.forEach(element => { console.log(element._id); ReassignCase(element._id) });
        window.location.replace("/admin");

    }
    const ReassignCase = async (caseid) => {

        console.log(currentmanager);
        console.log(caseid);
        console.log(userState.user.username);

        try {
            await reassignCase({
                variables: { username: currentmanager, caseid: caseid, olduser: userState.user.username }
            });
            //   
        } catch (e) {
        }

    }


    function toggleCaseSelected(casedata, event) {
        const { checked, name } = event.target;
        console.log(casedata);
        console.log(checked);
        let cases = selectState.cases;
        if (checked) {

            cases.push(casedata);
            console.log(cases);
            setselectState({ cases: [...cases] });
        } else {
            cases = cases.filter(item => item !== casedata);
            console.log(cases);
            setselectState({ cases: [...cases] });
        }

        console.log(name);
    }

    function renderListingReassign() {

        let casedataList = [];
        let usercases = selectState.cases || [];

        usercases.map(casedata => {


            casedataList.push(<tr >
                <td></td>
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
                <td className='status'>{casedata.status}</td>
                <td >{casedata.level}</td>
                <td >{casedata.lastupdate}</td>


            </tr>);
        }
        )

        return casedataList;
    }
    function renderListing() {
        let i = 1;

        let casedataList = [];
        let usercases = userState.user.cases || [];
        let prefsarray = [];
        if (currentCategory === "Active") { prefsarray = prefsState.showactive }
        else if (currentCategory === "Transfer") { prefsarray = prefsState.showtransfer };

        usercases.map(casedata => {

            if (prefsarray.includes(casedata.phase)) {
                casedataList.push(<tr >
                    <td><input type="checkbox" key={casedata._id} name={casedata.id} onChange={(event) => toggleCaseSelected(casedata, event)} />&nbsp;</td>
                    <td >{i}</td>
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
                    <td className='status'>{casedata.status}</td>
                    <td >{casedata.level}</td>
                    <td >{casedata.lastupdate}</td>


                </tr>); i++;
            }
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
                            {users.map((user, index) => (
                                <div class="col-3 userlist" onClick={UserClicked(index)}>{user.username}  </div>
                            ))}



                        </div>
                    </div>

                </div>
                <br />

                <div class=" d-flex justify-content-center">
                    <button type="button" class={`mebtn ${currentCategory === 'Active' ? 'active' : ''}`} onClick={() => { setCurrentCategory("Active"); setselectState({ cases: [] }); }}>Active Cases</button>
                    <button type="button" class={`mebtn ${currentCategory === 'Transfer' ? 'active' : ''}`} onClick={() => { setCurrentCategory("Transfer"); setselectState({ cases: [] }); }} >Transferred Cases</button>
                    <button type="button" class={`mebtn ${currentCategory === 'Quickbase' ? 'active' : ''}`} onClick={() => { setCurrentCategory("Quickbase"); setselectState({ cases: [] }); }} >Quickbase Cases</button>
                    <button type="button" class={`mebtn ${currentCategory === 'reassign' ? 'active' : ''}`} onClick={() => setCurrentCategory("reassign")} >Reassign Cases</button>

                </div>
                <div class="row">

                    <div class="col-lg-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">
                        <div class="content tabscroll">
                            <h3>{userState.user.username}'s cases</h3>
                            <p></p>
                            {currentCategory === 'reassign' &&
                                <div class="form-group">
                                    <label for="form_name">Choose new case manager</label>
                                    <select
                                        id="typecase"
                                        type="text"
                                        name="typecase"
                                        class="form-control w-50"
                                        value={userState.typecase}
                                        onChange={handleChangeManager}
                                        required >
                                        <option ></option>
                                        {users.map(user => (
                                            <option >{user.username}</option>
                                        ))}
                                    </select> < br />
                                    <div className='btn btn-success' onClick={ReassignCases} > Reassign</div>
                                </div>
                            }
                            <Table bordered hover className='bg-white tabscroll' size="sm">
                                <thead>
                                    <tr>
                                        <th className="border-0 text-center one-line"></th>
                                        <th className="border-0 text-center">N</th>
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
                                        <th className="border-0 text-center status">STATUS</th>
                                        <th className="border-0 text-center">level</th>
                                        <th className="border-0 text-center">lastupdate</th>

                                    </tr>
                                </thead>
                                <tbody className='tabscroll '>
                                    {currentCategory !== 'reassign' && renderListing()}
                                    {currentCategory === 'reassign' && renderListingReassign()}

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