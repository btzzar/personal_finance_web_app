import React from "react";
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom";

export default function TopMenu(){
    return (
        <Nav className="justify-content-center">
            <Nav.Item>
                <Link className="nav-link" to="/">Home</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/account">Accounts</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/profile">My Profile</Link>
            </Nav.Item>
        </Nav>

    );
}