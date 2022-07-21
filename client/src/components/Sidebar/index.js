import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';



import {  QUERY_ME, NEW_DEMAND } from '../../utils/queries';
import { Redirect } from 'react-router-dom';
import IntDashboard from '../IntDashboard'
import IntMembers from '../IntMembers'
import AllManagers from '../AllManagers'
import AllDemand from '../AllDemand'
import AllNego from '../AllNego'
import ManagersDashboard from '../ManagersDashboard'
import NegoDashboard from '../NegoDashboard'
import NewDemand from '../NewDemand'
import Users from '../Users'
import Prefs from '../Prefs'
import CMData from '../CMData'
import AddCase from '../AddCase'
import { useQuery } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  Dropdown
} from "react-bootstrap";
import { QUERY_USERS } from '../../utils/queries';

const Sidebar = props => {
  
  const [currentCategory, setCurrentCategory] = useState('ManagersDashboard');
  const [usersState, setusersState] = useState([]);
  const [demandState, setdemandState] = useState([]);
  const { loading, data } = useQuery( QUERY_ME, {    
  });
  const { loading:loading2, data:data2 } = useQuery(QUERY_USERS, {
  });
  useEffect(() => {
    if (typeof data2 !== "undefined") {
      console.log("users "+ data2.users)
    setusersState(data2.users);}
  
  }, [ data2]);
  // useEffect(() => {
  //   if (currentCategory!== "IntDashboard") {
  //   window.location.reload(false);}
  
  // }, [ currentCategory]);
  const { loading:loading3, data:data3 } = useQuery(NEW_DEMAND, {
  });
  useEffect(() => {
    if (typeof data3 !== "undefined") {
      
    setdemandState(data3.newdemand);}
  
  }, [ data2]);

  const user = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  

  const users = data2?.users || [];
  
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
  

  function ss ( $ ) {

    $(".sidebar-dropdown > a").click(function() {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function() {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
  $(".page-wrapper").addClass("toggled");
});


   
   
};


  return (
    <div>
    <div class="page-wrapper chiller-theme toggled">
  
  <nav id="sidebar" class="sidebar-wrapper">
    <div class="sidebar-content">
      <div class="sidebar-brand">
        <a href="#">AK sidebar</a>
        <div id="close-sidebar">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="sidebar-header">
     
        <div class="user-info">
          <span class="user-name"><strong>{user.username} </strong>
            
          </span>
          <span class="user-role">Administrator</span>
          <span class="user-status">
            <i class="fa fa-circle"></i>
            <span>Online</span>
          </span>
        </div>
      </div>

      <div class="sidebar-menu">
        <ul>
          <li class="header-menu">
            <span>General</span>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
            <i class="fa fa-book"></i>
              <span>Dashboard</span>
              
            </a>
            <div class="">
            
              <ul>
                    <li>
                  <div class="sidebarbutton"  onClick={() => setCurrentCategory("ManagersDashboard")}>Dashboard: Case Managers</div>
                </li>
                
                <li>
                <div class="sidebarbutton"onClick={() => setCurrentCategory("NegoDashboard")}>Dashboard: Negotiaions</div>
                </li>
                <li>
                  <div class="sidebarbutton"onClick={() => setCurrentCategory("IntDashboard")}>Intakes Platforms
                    <span class="badge badge-pill badge-success">v</span>
                  </div>
                </li>
                <li>
                <div class="sidebarbutton" onClick={() => setCurrentCategory("IntMembers")}>Intakes Members
                    <span class="badge badge-pill badge-success">v</span>
                  </div>
                </li>
          
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
            <i class="fa fa-calendar"></i>
              <span>Departments</span>
              
            </a>
            <div class="">
            
              <ul>
              <li>
                  <a href="#" class={` ${currentCategory === 'CMData' ? 'active' : ''}`} onClick={() => setCurrentCategory("CMData")}>Case Managers</a>
                </li>
                {/* <li>      <Dropdown >
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Case Managers
  </Dropdown.Toggle>

  <Dropdown.Menu>
  {users.map(user => (
    <Dropdown.Item  href="#/action-1">{user.username}</Dropdown.Item>
                    ))}
    

  </Dropdown.Menu>
</Dropdown></li> */}
          
                
       

                {demandState.length > 0 &&
                  <li>
                  <div class="sidebarbutton"onClick={() => {setCurrentCategory("NewDemand")}}>New Demand Cases!!!</div>
                </li>
            
      }
      <li>
      <div class="sidebarbutton" onClick={() => setCurrentCategory("AllDemand")}>Demands</div>
                </li>
      <li>
      <div class="sidebarbutton"onClick={() => setCurrentCategory("AllNego")}>Negotiations</div>
                </li>
                <li>
                <div class="sidebarbutton" onClick={() => setCurrentCategory("AllCases")}>AllCases</div>
                </li>
              </ul>
            </div>
          </li>
         
        </ul>
      </div>

      
    </div>
    
    <div class="sidebar-footer">
    
    <div class="sidebarbutton"  onClick={() => setCurrentCategory("Users")}>
        <i class="fa fa-user"></i>
        
      </div>
      <div class="sidebarbutton" onClick={() => setCurrentCategory("Prefs")}>
        <i class="fa fa-cog"></i>
        
      </div>
      
    </div>
  </nav>
  

      
  </div>
  <div>
  
  {(currentCategory === "IntDashboard") ? <IntDashboard /> : <>  </>}
  {(currentCategory === "IntMembers") ? <IntMembers /> : <>  </>}
  {(currentCategory === "CMData") ? <AllManagers /> : <>  </>}
  {(currentCategory === "AllDemand") ? <AllDemand /> : <>  </>}
  {(currentCategory === "AllNego") ? <AllNego /> : <>  </>}
  {(currentCategory === "Users") ? <Users /> : <>  </>}
  {(currentCategory === "Prefs") ? <Prefs /> : <>  </>}
  {(currentCategory === "ManagersDashboard") ? <ManagersDashboard/> : <>  </>}
  {(currentCategory === "NegoDashboard") ? <NegoDashboard/> : <>  </>}
  {(currentCategory === "NewDemand") ? <NewDemand cases= {demandState} /> : <>  </>}
  {(currentCategory === "AllCases") ? <Redirect to="/admin/allcases" /> : <>  </>}

      </div>
     
  </div>
  

  );
}

export default Sidebar;