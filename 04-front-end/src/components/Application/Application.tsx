import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import api from '../../api/api';
import EventRegister from '../../api/EventRegister';
import AccountPage from '../AccountPage/AccountPage';
import HomePage from '../HomePage/HomePage';
import TopMenu from '../TopMenu/TopMenu';
import TransactionPage from '../TransactionPage/TransactionPage';
import UserLogin from '../UserLogin/UserLogin';
import UserLogout from '../UserLogout/UserLogout';
import './Application.sass';

class ApplicationState {
  authorizationRole: "user" | "visitor" = "visitor";

}

export default class Application extends React.Component {
  state: ApplicationState;

  constructor(props:any){

    super(props);

    this.state = {
      authorizationRole: "visitor"
    }
  }

  componentDidMount(){
    EventRegister.on("AUTH_EVENT", this.authEventHandler.bind(this));

    this.checkOk();
}

componentWillUnmount(){
    EventRegister.off("AUTH_EVENT", this.authEventHandler.bind(this));
}

private authEventHandler(message:string){
    if(message === "force_login" || message === "user_logout"){
      return this.setState({ authorizationRole: "visitor"});
    }
    if(message === "user_login"){
      return this.setState({ authorizationRole: "user"});  
    }
}

private checkOk(){
  api("get", "auth/user/ok")
  .then(res => {
    if(res.data === "OK"){
      this.setState({
        authorizedRole: "user"
      });

      EventRegister.emit("AUTH_EVENT", "user_login");
    }
  })
  .catch(()=>{});
}



  render(){
    return (

      <BrowserRouter>    
        <Container className = "Application">
        <div className="Application-header">Front-end aplikacije</div>
        <TopMenu currMenuType= {this.state.authorizationRole} />
          <div className="Application-body">
            <Switch>
              <Route exact path="/" component = {HomePage} />

              <Route exact path="/account/:id?" component = {AccountPage} />

              <Route path="/profile">My Profile</Route>

              <Route path="/auth/user/login" component={UserLogin} />

              <Route path="/auth/user/logout" component={UserLogout} />

              <Route path="/account/:id?/transaction" component={TransactionPage} />

            </Switch>
          </div>
          <div>&copy; 2021...</div>
        
        </Container>
      </BrowserRouter>

    );
  }
}

