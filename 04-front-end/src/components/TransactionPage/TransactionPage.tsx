import EventRegister from "../../api/EventRegister";
import TransactionService from "../../services/TransactionService";
import BasePage, { BasePageProperties } from "../BaseComponent/BaseComponent";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Alert, Button, Card, Col, Dropdown, Form, FormGroup, Row } from "react-bootstrap";
import AccountService from "../../services/AccountService";




class TransactionProperties extends BasePageProperties{
    match?:{
        params:{
            id: string;
        }
    }
}

class TransactionState{
    transactions: any[] = [];
    loading: boolean = false;
    reloaded:boolean = false;
    addedCat: string = "";
    addedVal: number = 0;
    addedType: "expense" | "income" | "" = "";
    toggleAdd: boolean = false;
    toggleList: boolean = false;
    currency: "eur" | "usd" | "rsd" | "gbp" | "" = "";
    message: string = "";
}



export default class TransactionPage extends BasePage<TransactionProperties>{

    state: TransactionState;

    constructor(props:any){
        super(props)

        this.state = {
            transactions: [],
            loading: true,
            reloaded: false,
            addedCat: "",
            addedVal: 0,
            addedType: "",
            toggleAdd: false,
            toggleList: false,
            currency: "",
            message: ""
        }
    }

    private getAccountId(): number|null {
        const id = this.props.match?.params.id;

        return id ? +(id) : null;
    }

    private getCurrency() {
        const id = this.getAccountId();
        var x = "me"
        if(id !== null)
        AccountService.getCurrencyById(id)
        .then(result => {
            if(result !== null){
                this.setState({
                    currency: result
                })
            }
        })
    }



    getTransactionData(id: number | null) {
        if(id !== null)
        TransactionService.getAllTransactionsByAccountId(id)
        .then(transactions => {
            
            this.setState({
                transactions: transactions,
                loading: false,
            })
            //console.log("TR PAGE Transakcije: ", this.state.transactions)
        })
    }

    componentDidMount(){
       this.getTransactionData(this.getAccountId());
       this.getCurrency();
       
        EventRegister.on("AUTH_EVENT", this.authEventHandler.bind(this));
    }

    componentDidUpdate(prevProps: TransactionProperties, prevState: TransactionState){
        if(prevProps.match?.params.id !== this.props.match?.params.id){
            if(this.getAccountId() != null){
                this.getTransactionData(this.getAccountId());
                this.getCurrency();
            }
        }
    }

    componentWillUnmount(){
        EventRegister.off("AUTH_EVENT", this.authEventHandler.bind(this));
    }

    private authEventHandler(){

    }   
    
    
    private onChangeInput(field: "addedCat" | "addedVal" | "addedType"): 
    (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [field]: event.target.value,
            })
        }
    }    

    


    renderMain(): JSX.Element {
       
        const columns = [
            { dataField: "category", text: "Kategorija"},
            { dataField: "value", text: "Vrednost"},
            { dataField: "createdAt", text: "Datum transakcije"}

        ]
        
        if(this.state.loading){
            return (
                <>Loading...</>
            )

        }else {
        return(
            <>
            {
            this.state.toggleAdd ? 
            (
            <Card className="p-3 mb-5">
                <Card.Title><b>Dodavanje transakcije</b></Card.Title>
                <Card.Text as="div">
                    <Col xs={12} md={6}>
                
                                    <FormGroup>
                                        <Form.Label>Kategorija</Form.Label>
                                        <Form.Control   type="text" 
                                                        placeholder="Unesite kategoriju transakcije"  
                                                        value={this.state.addedCat}
                                                        onChange = {this.onChangeInput("addedCat")} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Iznos</Form.Label>
                                        <Form.Control   type="text" 
                                                        placeholder="Unesite iznos transakcije" 
                                                        value={this.state.addedVal}
                                                        onChange = {this.onChangeInput("addedVal")}
                                                        />
                                    </FormGroup>
                                    <FormGroup className= "mt-3">
                                    <Form.Check
                                        inline
                                        label="Dohodak"
                                        name="group1"
                                        type= 'radio'
                                        id='inline-radio-1'
                                        value="income"
                                        onChange = {this.onChangeInput("addedType")}
                                    />
                                    <Form.Check
                                        inline
                                        label="Trošak"
                                        name="group1"
                                        type= 'radio'
                                        id='inline-radio-2'
                                        value ="expense"
                                        onChange = {this.onChangeInput("addedType")}
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
                                    onClick={() => this.setState({toggleAdd: true})}> Dodaj Transakciju</Button>)
                                    
                }
                {   
                    this.state.toggleList ? 
                    (<BootstrapTable 
                        keyField={"expenseId"}
                        data={this.state.transactions}
                        columns={columns}
                        pagination={paginationFactory({})}
                        //sort={ { dataField: "category", order: 'desc' }}
                    />)
                    :
                    (<Button variant="primary" className="m-3"
                    onClick={() => this.setState({toggleList: true})}> Prikaži listu transakcija</Button>)

                }
            </>
            
        )
        }
    }

    checkInputs(): boolean{
        if(this.state.addedCat == ""){
            this.setState({
                message: "Postaviti validnu kategoriju"
            })
            return false;
        }
        if(this.state.addedVal <= 0){
            this.setState({
                message: "Postaviti validan iznos"
            })
            return false;
        }
        
        if(this.state.addedType == ""){
            this.setState({
                message: "Postaviti validan tip transakcije"
            })
            return false;
        }

        return true;
    }
    handleAddButtonClick(): void {
        const data = {
            "accountId": this.getAccountId(),
            "category": this.state.addedCat,
            "value": +(this.state.addedVal),
            "currency": this.state.currency
        }

        
        
        if(this.checkInputs() && this.state.addedType){
            TransactionService.addTransaction(this.state.addedType, data)
            .then(res=> {
                if(res.success){
                    //console.log("USpEHHHHH", res)
                    this.setState({ 
                        addedCat: "",
                        addedVal: 0,
                        addedType: "",
                        toggleAdd: false})
                }else{
                    //console.log("NEMERE")
                    console.log(res.message)
                }
            })                
        }


       
    }
}