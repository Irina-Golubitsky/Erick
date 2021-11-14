
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import Auth from '../../utils/auth';
import {  useParams } from 'react-router-dom';



import Info from '../Info'
let usemail = "";

const Profile = props => {
  const [currentCategory, setCurrentCategory] = useState('info');
  const { email: userParam } = useParams();
  const loggedIn = Auth.loggedIn();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { email: userParam }
  });
  const user = data?.me || data?.user || {}

  if (loading) {
    return <div>Loading...</div>;
  }

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

      {(currentCategory === "info") ? <Info user={data} /> : <>  </>}
    </section>

  );
};

export default Profile;
