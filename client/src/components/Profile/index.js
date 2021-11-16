

import React, { useState } from 'react';
import Auth from '../../utils/auth';




import Info from '../Info'
import Table from '../Table'


const Profile = props => {
  const [currentCategory, setCurrentCategory] = useState('info');
  const loggedIn = Auth.loggedIn();

  if (!loggedIn) {
    return (
      <h4 class="login-error">
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }


  return (

    <section class="why-us section-bg">
      <div class=" d-flex justify-content-center">
        <button type="button" class=" mebtn" onClick={() => setCurrentCategory("info")}>Info</button>
        <button type="button" class="mebtn " onClick={() => setCurrentCategory("table")} >Timetable</button>
        <button type="button" class="mebtn  " onClick={() => setCurrentCategory("page")} >Page preview</button>
      </div>

      {(currentCategory === "info") ? <Info /> : <>  </>}
      {(currentCategory === "table") ? <Table /> : <p> x </p>}
    </section>

  );
};

export default Profile;
