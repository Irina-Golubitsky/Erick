import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Auth from '../../utils/auth';
import {  QUERY_ME } from '../../utils/queries';

const Header = () => {
  const { loading, data } = useQuery( QUERY_ME, {    
  });
  const user = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  let mepath="/admin";
  if (user.role==="Demand"){mepath="/demand"}
  else if(user.role==="Case Manager"){mepath="/manager"}
  else if(user.role==="Negotiation"){mepath="/nego"}
  
  return (
 
   
  <header id="header" >
  <div class="container d-flex align-items-center pl-4">

    <h1 class="logo me-auto"><Link to="/"> <img src={require(`../../img/ak_logo.webp`).default}
                            alt="hero-img" key="hero-img.png" className="aklogo" /></Link></h1>
   
  
    <nav id="navbar" class="navbar">
    {Auth.loggedIn() ? (
            <>
              <Link to={mepath} >Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
          
            </>
          )}
   
      
    </nav>

  </div>
</header>
  
  );
};

export default Header;

