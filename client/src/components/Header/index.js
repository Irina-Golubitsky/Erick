import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
 
   
  <header id="header" >
  <div class="container d-flex align-items-center pl-4">

    <h1 class="logo me-auto"><Link to="/"> <img src={require(`../../img/ak_logo.webp`).default}
                            alt="hero-img" key="hero-img.png" className="aklogo" /></Link></h1>
   
  
    <nav id="navbar" class="navbar">
    {Auth.loggedIn() ? (
            <>
              <Link to="/admin">Me</Link>
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

