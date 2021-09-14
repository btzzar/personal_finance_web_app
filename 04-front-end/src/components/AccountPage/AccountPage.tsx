import React from "react";
import { Link, Redirect } from "react-router-dom";
import BasePage, { BasePageProperties } from "../BaseComponent/BaseComponent";
import AccountModel from "../../../../03-back-end/src/components/account/model";
import AccountService from "../../services/AccountService";
import EventRegister from "../../api/EventRegister";
import { getId } from "../../api/api";
import { Alert, Button, Card, Col, Container, Form, FormGroup, ListGroup, Row } from "react-bootstrap";


class AccountProperties extends BasePageProperties{
    match?:{
        params:{
            id: string;
        }
    }
}

class AccountState{
    title: string = "Loading...";
    accounts: AccountModel[] = [];
    isLoggedIn: boolean = true;
    transactions: any[] = [];
    userId: number|null = null; 
    toggleAdd: boolean = false;
    accName: string = "";
    accDesc: string = "";
    accCurr: "eur" | "rsd" | "usd" | "gbp" | "" = "";
    message: "";
}

export default class AccountPage extends BasePage<AccountProperties> {

    state: AccountState;

    constructor(props: AccountProperties){
        super(props);

        this.state = {
            title: "Sve Kase:",
            accounts: [],
            isLoggedIn: true,
            transactions: [],
            userId: null,
            toggleAdd: false,
            accName:  "",
            accDesc:  "",
            accCurr:  "",
            message: "",
        }
    }
    

    private getAccountData(id: number){
        this.apiGetAllAccounts(id);
    }

    apiGetAllAccounts(id: number) {
        AccountService.getAllAccounts(id)
        .then(accounts => {
            if(accounts.length === 0){
                return this.setState({
                    title: "No accounts found",
                    accounts: []
                })
            }
            this.setState({
                title: "Sve kase:",
                accounts: accounts,
            })

        })
    }

  
    componentDidMount(){
        const id = +(getId());
        ////console.log("GOT USER ID", id, typeof id);

        this.setState({
            userId: id
        })
        this.getAccountData(id);

        EventRegister.on("AUTH_EVENT", this.authEventHandler.bind(this));
    }

    componentDidUpdate(prevProps: AccountProperties, prevState: AccountState){
        // if(prevProps.match?.params.id !== this.props.match?.params.id){
        //     this.getAccountData(this.state.userId);
        // }
    }

    componentWillUnmount(){
        EventRegister.off("AUTH_EVENT", this.authEventHandler.bind(this));
    }

    private authEventHandler(status: string){
        
        if(status === "force_login"){
            this.setState({
                isLoggedIn: false
            })
        }
    }

    private onChangeInput(field: "accName" | "accDesc" | "accCurr"): 
    (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [field]: event.target.value,
            })
        }
    }   

    renderMain(): JSX.Element  {
        if(this.state.isLoggedIn === false){
            return (
                <Redirect to="/auth/user/login" />
            );
        }
        return (

            <>

{
            this.state.toggleAdd ? 
            (
            <Card  className="bg-light p-3 mb-5">
                <Card.Title><b>Dodavanje Računa</b></Card.Title>
                <Card.Text as="div">
                    <Col xs={12} md={6}>
                
                                    <FormGroup>
                                        <Form.Label>Naziv</Form.Label>
                                        <Form.Control   type="text" 
                                                        placeholder="Unesite naziv računa"  
                                                        value={this.state.accName}
                                                        onChange = {this.onChangeInput("accName")} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Opis</Form.Label>
                                        <Form.Control   type="textArea" 
                                                        placeholder="Unesite opis računa" 
                                                        value={this.state.accDesc}
                                                        onChange = {this.onChangeInput("accDesc")}
                                                        />
                                    </FormGroup>
                                    <FormGroup className= "mt-3">
                                    <Form.Check
                                        inline
                                        label="eur"
                                        name="group1"
                                        type= 'radio'
                                        id='inline-radio-1'
                                        value="eur"
                                        onChange = {this.onChangeInput("accCurr")}
                                    />
                                    <Form.Check
                                        inline
                                        label="rsd"
                                        name="group1"
                                        type= 'radio'
                                        id='inline-radio-2'
                                        value ="rsd"
                                        onChange = {this.onChangeInput("accCurr")}
                                    />
                                    <Form.Check
                                        inline
                                        label="gbp"
                                        name="group1"
                                        type= 'radio'
                                        id='inline-radio-3'
                                        value ="gbp"
                                        onChange = {this.onChangeInput("accCurr")}
                                    />
                                    <Form.Check
                                        inline
                                        label="usd"
                                        name="group1"
                                        type= 'radio'
                                        id='inline-radio-4'
                                        value ="usd"
                                        onChange = {this.onChangeInput("accCurr")}
                                    />
                                     </FormGroup>
                                    {
                                        this.state.message ? 
                                    (<FormGroup className="mt-3">
                                        <Alert key="1" variant="danger">
                                            {this.state.message}    
                                        </Alert>
                                        
                                        
                                    </FormGroup>) : <></>
                                    }

                                    <FormGroup className="mt-3">
                                    <Button variant="success" 
                                    onClick={() => this.handleAddButtonClick()}> Dodaj </Button>
                                    <Button variant="danger" className="m-3"
                                    onClick={() => this.setState({ toggleAdd: false, message: ""})}> Odustani </Button>
                                    </FormGroup>

                                    
                    </Col>
                </Card.Text>
                </Card>)
                : 
                                    (<Button variant="primary" className="mt-3 mb-3"
                                    onClick={() => this.setState({toggleAdd: true})}> Dodaj Kasu</Button>)
                                    
                }
            
                

                
                <ListGroup>
                                <ListGroup.Item variant="dark" key={-1}>
                                    <Container  className="mb-1">
                                        <Row >
                                            <Col sm={true}md={true}lg={true}>Naziv računa</Col>
                                            <Col sm={true}md={true}lg={true}>Saldo</Col>
                                            <Col sm={true}md={true}lg={true}>Valuta</Col>
                                        </Row>
                                    </Container>
                                </ListGroup.Item>

                    {
                        this.state.accounts.map(
                            acc => (
                                <ListGroup.Item variant="secondary" key={acc.accountId}>
                                    <Container>
                                        <Row>
                                            <Col sm={true}md={true}lg={true}> <Link to= {"/account/" + acc.accountId + "/transaction"}> {acc.name} </Link></Col>
                                            <Col sm={true}md={true}lg={true}>{acc.total}</Col>
                                            <Col sm={true}md={true}lg={true}>{acc.currency}</Col>
                                        </Row>
                                    </Container>
                                </ListGroup.Item>
                            )
                        )
                    }   
                </ListGroup>

           
            </>

        );
    }

    checkInputs(): boolean{
        if(this.state.accName === ""){
            this.setState({
                message: "Postaviti validan naziv računa"
            })
            return false;
        }
        
        if(this.state.accCurr === ""){
            this.setState({
                message: "Postaviti validnu valutu"
            })
            return false;
        }

        return true;
    }

    handleAddButtonClick(): void {
        const data = {
            "userId": this.state.userId,
            "currency": this.state.accCurr,
            "name": this.state.accName,
            "description": this.state.accDesc,
        }

           
        
        if(this.checkInputs() && this.state.accCurr){
            AccountService.addAccount(data)
            .then(res=> {
                if(res.success){
                    ////console.log("USpEHHHHH", res)
                    this.setState({ 
                        accName: "",
                        accDesc: "",
                        accCurr: "",
                        message: "",
                        toggleAdd: false})
                        const id = +(getId());
                        this.getAccountData(id);                        
                }else{
                    ////console.log("NEMERE")
                    ////console.log(res.message)
                }
            })                
        }


       
    }

}