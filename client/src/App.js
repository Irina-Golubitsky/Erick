import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Hero from './components/Hero';
import Profile from './components/Profile';



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

        <Switch>

          <Route exact path="/" component={Header} />
          <Route exact path="/profile" component={Header} />
          <Route exact path="/login" component={Header} />
          <Route exact path="/signup" component={Header} />
        </Switch>

        <Switch>

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>


        <Switch>
          <Route exact path="/" component={Hero} />
          <Route exact path="/login" component={Hero} />
          <Route exact path="/signup" component={Hero} />
        </Switch>
        <Switch>

          <Route exact path="/profile" component={Profile} />

        </Switch>

        <Footer />

      </Router>
    </ApolloProvider>
  );
}

export default App;

