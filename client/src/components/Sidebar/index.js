import React, { useState } from 'react';
import Auth from '../../utils/auth';



import {  QUERY_ME } from '../../utils/queries';

import IntDashboard from '../IntDashboard'
import IntMembers from '../IntMembers'
import Users from '../Users'
import CMData from '../CMData'
import AddCase from '../AddCase'
import { useQuery } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const Sidebar = props => {
  const [currentCategory, setCurrentCategory] = useState('IntDashboard');
  const { loading, data } = useQuery( QUERY_ME, {    
  });
  const user = data?.me || {};
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
          <span class="user-name"><strong> {user.username}</strong>
            
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
                  <a href="#" class={` ${currentCategory === 'info' ? 'active' : ''}`} onClick={() => setCurrentCategory("IntDashboard")}>Intakes Platforms
                    <span class="badge badge-pill badge-success">v</span>
                  </a>
                </li>
                <li>
                  <a href="#" class={` ${currentCategory === 'info' ? 'active' : ''}`} onClick={() => setCurrentCategory("IntMembers")}>Intakes Members
                    <span class="badge badge-pill badge-success">v</span>
                  </a>
                </li>
                <li>
                  <a href="#" class={` ${currentCategory === 'info' ? 'active' : ''}`} onClick={() => setCurrentCategory("CMData")}>Case Managers</a>
                </li>
                <li>
                  <a href="#" class={` ${currentCategory === 'info' ? 'active' : ''}`} onClick={() => setCurrentCategory("AddCase")}>AddCase</a>
                </li>
                <li>
                  <a href="#" class={` ${currentCategory === 'info' ? 'active' : ''}`} onClick={() => setCurrentCategory("info")}>Negotiaions</a>
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
                  <a href="#">Intakes
                    
                  </a>
                </li>
                <li>
                  <a href="#">Case Managers</a>
                </li>
                <li>
                  <a href="#">Demands</a>
                </li>
                <li>
                  <a href="#">Negotiaions</a>
                </li>
                <li>
                  <a href="#">Litigation</a>
                </li>
              </ul>
            </div>
          </li>
         
        </ul>
      </div>
      
    </div>
    
    <div class="sidebar-footer">
    
    <a href="#" class={` ${currentCategory === 'users' ? 'active' : ''}`} onClick={() => setCurrentCategory("Users")}>
        <i class="fa fa-user"></i>
        
      </a>
      <a href="#">
        <i class="fa fa-cog"></i>
        
      </a>
      
    </div>
  </nav>
  

      
  </div>
  <div>
  
  {(currentCategory === "IntDashboard") ? <IntDashboard user={user}/> : <>  </>}
  {(currentCategory === "IntMembers") ? <IntMembers user={user}/> : <>  </>}
  {(currentCategory === "CMData") ? <CMData user={user}/> : <>  </>}
  {(currentCategory === "Users") ? <Users user={user}/> : <>  </>}
  {(currentCategory === "AddCase") ? <AddCase user={user}/> : <>  </>}

      </div>
      <script src="script.js"></script>
  </div>
  

  );
}

export default Sidebar;