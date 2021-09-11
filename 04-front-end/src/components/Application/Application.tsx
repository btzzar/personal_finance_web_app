import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AccountPage from '../AccountPage/AccountPage';
import HomePage from '../HomePage/HomePage';
import TopMenu from '../TopMenu/TopMenu';
import UserLogin from '../UserLogin/UserLogin';
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

            <Route path="/account/:id?" component = {AccountPage} />

            <Route path="/profile">My Profile</Route>

            <Route path="/auth/user/login" component={UserLogin} />

          </Switch>
        </div>
        <div>&copy; 2021...</div>
      
      </Container>
    </BrowserRouter>

  );
}

export default Application;
