import Auth from '../../utils/auth';
import Userpage from '../Userpage';

const Preview =({ user }) => {
    if (!Auth.loggedIn()){
        return (
          <h4 class="login-error">
            You need to be logged in to see this. Use the navigation links above to sign up or log in!
          </h4>
        );
      } 
      const Userlink= window.location.href.replace("profile","")+"page/"+user.username;
      return (
          <div>
          <div class="text-center p-3">

        <h3>Visit your webpage: <a href={Userlink} target="_blank">{Userlink}</a></h3>
        </div>
      <div class="container border border-dark">
      
    <Userpage />
      </div>
      </div>

    );
};

export default  Preview;