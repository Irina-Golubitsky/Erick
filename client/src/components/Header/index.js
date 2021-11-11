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
  <div class="container d-flex align-items-center">

    <h1 class="logo me-auto"><Link to="/">Title</Link></h1>
   
  
    <nav id="navbar" class="navbar">
    {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
   
      
    </nav>

  </div>
</header>
  
  );
};

export default Header;
