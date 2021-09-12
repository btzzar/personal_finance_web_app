import React from "react";
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom";
import EventRegister from "../../api/EventRegister";

class TopMenuProperties {
    currMenuType: "user" | "administrator" | "visitor" = "visitor";
}

export default class TopMenu extends React.Component<TopMenuProperties> {

    render() {

        if(this.props.currMenuType === "visitor"){
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
                <Link className="nav-link" to="/auth/user/logout">Logout</Link>
            </Nav.Item>
                
            </Nav>
    
            );
        
    }
}