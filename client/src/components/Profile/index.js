
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import React, { useState} from 'react';
import Auth from '../../utils/auth';


import Info from '../Info'
let usemail="";

const Profile = props => {
  const [currentCategory, setCurrentCategory] = useState('info');
  const loggedIn=Auth.loggedIn();
  if (loggedIn) { usemail=Auth.getProfile().data.email};
  const {  data } = useQuery(QUERY_USER, {
    variables: { email: usemail }
  });
 
 
  if (!loggedIn) 
  {   
    return (
      <div class="login-error">
      <h4 >
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
      </div>
    );
  }

  //   Auth.getProfile().data.username === userParam
  // ) {
  //   return <Redirect to="/profile" />;
  // }



  return (

    <section class="why-us section-bg">
    <div  class=" d-flex justify-content-center">
            <button type="button" class=" mebtn"  onClick={()=> setCurrentCategory("info")}>Info</button>
            <button type="button" class="mebtn "  onClick={() => setCurrentCategory("table")} >Timetable</button>
            <button type="button" class="mebtn  "  onClick={() => setCurrentCategory ("page")} >Page preview</button>
</div>


               
                    
                   
                   
                    {(currentCategory==="info") ? <Info user={data}/> : <>  </> }



                 
                            
               
            </section>

  );
};

export default Profile;
