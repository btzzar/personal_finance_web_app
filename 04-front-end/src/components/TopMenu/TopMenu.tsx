import React from "react";
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom";
import EventRegister from "../../api/EventRegister";

class TopMenuState {
    currMenuType: "user" | "visitor" = "visitor";  
}


export default class TopMenu extends React.Component {
    state: TopMenuState;

    constructor(props: any) {
        super(props);

        this.state = {
            currMenuType: "visitor"
        }
    }


    componentDidMount(){
        EventRegister.on("AUTH_EVENT", this.authEventHandler.bind(this));

    }

    componentWillUnmount(){
        EventRegister.off("AUTH_EVENT", this.authEventHandler.bind(this));
    }

    private authEventHandler(message: string){
        if(message === "force_login" || message === "user_logout"){
            return this.setState({ currMenuType: "visitor"});
        }
        if(message === "user_login"){
            return this.setState({ currMenuType: "user"});
        }
    }

    render() {

        if(this.state.currMenuType === "visitor"){
        return (
        <Nav className="justify-content-center">
            <Nav.Item>
                <Link className="nav-link" to="/">Home</Link>
            </Nav.Item>
           
            <Nav.Item>
                <Link className="nav-link" to="/auth/user/login">Login</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/auth/user/register">Register</Link>
            </Nav.Item>
        </Nav>

        );
        }

        return (
            <Nav className="justify-content-center">
                <Nav.Item>
                    <Link className="nav-link" to="/">Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/account">Accounts</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/user/profile">My Profile</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/user/logout">Logout</Link>
                </Nav.Item>
                
            </Nav>
    
            );
        
    }
}