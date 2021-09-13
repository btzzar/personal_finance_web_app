import React from "react";
import { Alert, Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import EventRegister from "../../api/EventRegister";
import AuthService from "../../services/AuthService";
import BaseComponent from "../BaseComponent/BaseComponent";

class UserLoginState {

    email: string = "";
    password: string = "";
    message: string = "";
    isLoggedIn: boolean = false;

}

export default class UserLogin extends BaseComponent<{}>{
    state: UserLoginState;

    constructor(props:any){
        super(props);

        this.state= {
            email: "",
            password: "", 
            message: "",
            isLoggedIn: false
        }
    }

    componentDidMount() {
        EventRegister.on("AUTH_EVENT", this.handleAuthEvent.bind(this));
    }

    componentWillUnmount() {
        EventRegister.off("AUTH_EVENT", this.handleAuthEvent.bind(this));
    }


    renderMain(): JSX.Element  {
        if(this.state.isLoggedIn){
            return (
                <Redirect to="/account" />
            )
        }

        return (
            <Row>
                <Col sm={12} md={{span:6, offset:3}} lg={4}>
                    <Card className="p-3">
                        <Card.Title><b>Prijavljivanje Korisnika</b></Card.Title>
                        <Card.Text as="div">
                            <Form >
                                <FormGroup>
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control   type="email" 
                                                    placeholder="Upišite svoju e-mail adresu ovde..."  
                                                    value={this.state.email} 
                                                    onChange = {this.onChangeInput("email")} />
                                </FormGroup>
                                    <Form.Label>Lozinka:</Form.Label>
                                    <Form.Control   type="password" 
                                                    placeholder="Upišite svoju lozinku ovde..." 
                                                    value={this.state.password} 
                                                    onChange = {this.onChangeInput("password")}
                                                    />
                                <FormGroup>
                                    <Button variant="primary" className="mt-3"
                                    onClick={() => this.handleLogInButtonClick()}> Log in</Button>
                                </FormGroup>

                                {
                                this.state.message
                                ?  <Alert className="mt-3" key="1" variant="danger">
                                        {this.state.message}    
                                  </Alert>     
                                : ""
                                }

                            </Form>
                        </Card.Text>
                    
                    </Card>
                        
                </Col>
            </Row>
       );
    }
    
    handleLogInButtonClick(): void {
        
        AuthService.attemptUserLogin(this.state.email, this.state.password);
    }

    
    private onChangeInput(field: "email" | "password"): 
        (event: React.ChangeEvent<HTMLInputElement>) => void {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
                [field]: event.target.value,
            })
        }
    }

    
    private handleAuthEvent(status: string, data: any){
        if(status === "user_login_failed"){
            if(Array.isArray(data?.data) && data?.data[0]?.instancePath==="/email")
            {
                return this.setState({
                    message: "Invalid email: " + data?.data[0]?.message,
                })
            }
            if(Array.isArray(data?.data) && data?.data[0]?.instancePath==="/password")
            {
                return this.setState({
                    message: "Invalid password: " + data?.data[0]?.message,
                })
            }

            if(data?.status === 404){
                return this.setState({
                    message: "User not found.",
                })
            }

            if(data.includes("Access denied")){
                return this.setState({
                    message: "Wrong password.",
                })
            }

        }

        if(status === "user_login"){
            return this.setState({
                email: "",
                password: "",
                message: "",
                isLoggedIn: true
            })
        }
    }

}