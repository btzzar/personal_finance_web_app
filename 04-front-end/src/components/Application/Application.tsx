import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AccountsPage from '../AccountPage/AccountPage';
import HomePage from '../HomePage/HomePage';
import TopMenu from '../TopMenu/TopMenu';
import './Application.sass';

function Application() {
  return (

    <BrowserRouter>    
      <Container className = "Application">
       <div className="Application-header">Front-end aplikacije</div>
       <TopMenu />
        <div className="Application-body">
          <Switch>
            <Route exact path="/" component = {HomePage} />

            <Route path="/accounts/:id?" component = {AccountsPage} />

            <Route path="/profile">My Profile</Route>

          </Switch>
        </div>
        <div>&copy; 2021...</div>
      
      </Container>
    </BrowserRouter>

  );
}

export default Application;
