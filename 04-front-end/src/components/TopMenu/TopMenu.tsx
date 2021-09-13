import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";

class TopMenuProperties {
    currMenuType: "user" | "administrator" | "visitor" = "visitor";
}

export default class TopMenu extends React.Component<TopMenuProperties> {

    render() {

        if(this.props.currMenuType === "visitor"){
            return (
                <Navbar bg="primary" variant="dark" className="mb-3 mt-3 border rounded-2" style={{fontSize: 20}}>
                    <Container>
                        <Nav className="justify-content-center">
                            
                            <Nav.Item className="m-2">
                                <Link className="nav-link" to="/auth/user/login">Prijavi se</Link>
                            </Nav.Item>
                            <Nav.Item className="m-2">
                                <Link className="nav-link" to="/auth/user/register">Registruj se</Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>
        );
        }

        return (
            <Navbar bg="primary" variant="dark" className="mb-3 mt-3 border rounded-2" style={{fontSize: 20}}>
                <Container>
                    <Nav className="justify-content-center">
                       
                        <Nav.Item className="m-2">
                            <Link className="nav-link" to="/account">Računi</Link>
                        </Nav.Item>
                        
                        <Nav.Item className="m-2">
                        <Link className="nav-link" to="/auth/user/logout">Izloguj se</Link>
                    </Nav.Item>
                        
                    </Nav>
                </Container>
            </Navbar>
            );
        
    }
}