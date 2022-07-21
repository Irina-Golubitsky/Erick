import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


import Header from './components/Header';
import Footer from './components/Footer';

import Login from './components/Login';
import Hero from './components/Hero';
import EditUser from './components/EditUser';
import Manager from './components/Manager';
import AddCase from './components/AddCase';
import AllCases from './components/AllCases';
import AddData from './components/AddData';
import AddDemand from './components/AddDemand';
import AddNego from './components/AddNego';
import DemandCases from './components/DemandCases';
import EditDemand from './components/EditDemand';
import Nego from './components/Nego';
import EditNego from './components/EditNego';


import Sidebar from './components/Sidebar';




const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
<Header />
       

        <Switch>

          <Route exact path="/login" component={Login} />
        
        </Switch>


        <Switch>
          <Route exact path="/" component={Hero} />
          <Route exact path="/login" component={Hero} />
     
          
        </Switch>
        <Switch>
        <Route exact path="/admin" component={Sidebar} />
        <Route exact path="/admin/user:id" component={EditUser} />

      

        </Switch>
       
       <Switch>
     
        <Route exact path="/manager" component={Manager} />
        <Route exact path="/manager/case:id" component={AddCase} />

      

        </Switch> 
        <Switch>
     
     <Route exact path="/demand" component={DemandCases} />
     <Route exact path="/demand/case:id" component={EditDemand} />
  

   

     </Switch> 
     <Switch>
     
     <Route exact path="/nego" component={Nego} />
     <Route exact path="/nego/case:id" component={EditNego} />
  

   

     </Switch> 

       <Switch>
     
     <Route exact path="/admin/allcases" component={AllCases} />


     </Switch> 

     <Switch>
     
     <Route exact path="/adddata" component={AddData} />


     </Switch> 
     <Switch>
     <Route exact path="/adddemand" component={AddDemand} />
</Switch>
     <Switch>
     <Route exact path="/addnego" component={AddNego} />
</Switch>
        <Footer />


     

      </Router>
    </ApolloProvider>
  );
}

export default App;

