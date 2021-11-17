import React, { useState } from 'react';
import Auth from '../../utils/auth';



import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import Info from '../Info'
import Table from '../Table'
import Preview from '../Preview'
import { useQuery } from '@apollo/react-hooks';

const Profile = props => {
  const [currentCategory, setCurrentCategory] = useState('info');
  const { loading, data } = useQuery( QUERY_ME, {    
  });
  const user = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  
  console.log ("profile user " + user.username);
  console.log ("profile title " + user.title);
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

      {(currentCategory === "info") ? <Info user={user}/> : <>  </>}
      {(currentCategory === "table") ? <Table user={user}/> : <> </>}
      {(currentCategory === "page") ? <Preview user={user}/> : <>  </>}
    </section>

  );
};

export default Profile;