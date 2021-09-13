import React from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import EventRegister from "../../api/EventRegister";
import AuthService from "../../services/AuthService";
import BaseComponent from "../BaseComponent/BaseComponent";

class UserRegisterState {

    email: string = "";
    password: string = "";
    username: string = "";
    firstName: string = "";
    lastName: string = ""; 



    message: string = "";
    isRegistered: boolean = false;

}

export default class UserRegister extends BaseComponent<{}>{
    state: UserRegisterState;

    constructor(props:any){
        super(props);

        this.state= {
            email: "",
            password: "", 
            message: "",
            isRegistered: false,
            username: "",
            firstName: "",
            lastName: "",
        }
    }
   
    renderMain(): JSX.Element  {

        if(this.state.isRegistered){
            return (
                <Redirect to="/auth/user/login" />
            );
        }

        return (
            <Row>
                <Col sm={12} md={{span:10, offset:1}} lg={{span:8, offset:2}}>
                    <Card className="p-3">
                        <Card.Title><b>User Register</b></Card.Title>
                        <Card.Text as="div">
                            <Form >
                                <Row>
                                <Col xs={12} md={6}>
                                    <FormGroup>
                                        <Form.Label>E-mail:</Form.Label>
                                        <Form.Control   type="email" 
                                                        placeholder="Enter your email here..."  
                                                        value={this.state.email} 
                                                        onChange = {this.onChangeInput("email")} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control   type="password" 
                                                        placeholder="Enter your password here..." 
                                                        value={this.state.password} 
                                                        onChange = {this.onChangeInput("password")}
                                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Userename:</Form.Label>
                                        <Form.Control   type="text" 
                                                        placeholder="Enter your username here..." 
                                                        value={this.state.username} 
                                                        onChange = {this.onChangeInput("username")}
                                                        />
                                    </FormGroup>
                                    
                                </Col>
                                <Col xs={12} md={6}>
                                    
                                    <FormGroup>
                                        <Form.Label>Forename:</Form.Label>
                                        <Form.Control   type="text" 
                                                        placeholder="Enter your first name here..." 
                                                        value={this.state.firstName} 
                                                        onChange = {this.onChangeInput("firstName")}
                                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Surname:</Form.Label>
                                        <Form.Control   type="text" 
                                                        placeholder="Enter your last name here..." 
                                                        value={this.state.lastName} 
                                                        onChange = {this.onChangeInput("lastName")}
                                                        />
                                    </FormGroup>
                                    <FormGroup>
                                    <Button variant="primary" className="m-4"
                                    onClick={() => this.handleRegisterButtonClick()}> Register </Button>
                                    </FormGroup>
                                </Col>
                                    
                               

                                </Row>

                                {
                                this.state.message
                                ? (<p className="mt-3">{this.state.message}</p>)
                                : ""
                                }

                            </Form>
                        </Card.Text>
                    
                    </Card>
                        
                </Col>
            </Row>
       );
    }
    
    handleRegisterButtonClick(): void {
        AuthService.attemptUserRegister({
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        })
        .then(res=> {
            if(res.success){
            return this.setState({
                isRegistered: true
            })
            }
            this.setState({
                message: res.message
            })
        })
        
    }

    
    private onChangeInput(field: "email" | "password" | "username" | "firstName" | "lastName"): 
        (event: React.ChangeEvent<HTMLInputElement>) => void {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
                [field]: event.target.value,
            })
        }
    }    
}