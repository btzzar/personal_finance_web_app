import React from "react";
import { Alert, Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
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
                        <Card.Title><b>Registracija korisnika</b></Card.Title>
                        <Card.Text as="div">
                            <Form >
                                <Row>
                                <Col xs={12} md={6}>
                                    <FormGroup className="mt-2">
                                        <Form.Label>E-mail:</Form.Label>
                                        <Form.Control   type="email" 
                                                        placeholder="Upišite svoju e-mail adresu..."  
                                                        value={this.state.email} 
                                                        onChange = {this.onChangeInput("email")} />
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <Form.Label>Lozinka:</Form.Label>
                                        <Form.Control   type="password" 
                                                        placeholder="Upišite svoju lozinku..." 
                                                        value={this.state.password} 
                                                        onChange = {this.onChangeInput("password")}
                                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-3">
                                        <Form.Label>Korisničko ime:</Form.Label>
                                        <Form.Control   type="text" 
                                                        placeholder="Upišite svoje korisničko ime..." 
                                                        value={this.state.username} 
                                                        onChange = {this.onChangeInput("username")}
                                                        />
                                    </FormGroup>
                                    
                                </Col>
                                <Col xs={12} md={6}>
                                    
                                    <FormGroup className="mt-2">
                                        <Form.Label>Ime:</Form.Label>
                                        <Form.Control   type="text" 
                                                        placeholder="Upišite svoje ime..." 
                                                        value={this.state.firstName} 
                                                        onChange = {this.onChangeInput("firstName")}
                                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-2 mb-4">
                                        <Form.Label>Prezime:</Form.Label>
                                        <Form.Control   type="text" 
                                                        placeholder="Upišite svoje prezime..." 
                                                        value={this.state.lastName} 
                                                        onChange = {this.onChangeInput("lastName")}
                                                        />
                                    </FormGroup>
                                    <FormGroup className="m-5">
                                    <Button variant="primary"
                                    onClick={() => this.handleRegisterButtonClick()}> Potvrdi </Button>
                                    </FormGroup>
                                </Col>
                                    
                               

                                </Row>

                                {
                                this.state.message
                                ?   <Alert key="1" variant="danger">
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
    

    checkPassword(): boolean {
        const pass = this.state.password;

        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

        const res = strongPassword.test(pass);

        if(!res){
            this.setState({
                message: `Lozinka mora da bude dugačka minimalno 8 karaktera.  
                                                Mora sadržati: bar jedno veliko slovo,
                                                bar jedno malo slovo, bar jednu cifru, 
                                                i bar jedan specijalni karakter.`
            })
        }

        return res;
    }

    handleRegisterButtonClick(): void {
        if(this.checkPassword()){

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