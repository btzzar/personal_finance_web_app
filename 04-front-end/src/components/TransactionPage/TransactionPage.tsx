import EventRegister from "../../api/EventRegister";
import TransactionService from "../../services/TransactionService";
import BasePage, { BasePageProperties } from "../BaseComponent/BaseComponent";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Button, Card, Col, Dropdown, Form, FormGroup, Row } from "react-bootstrap";




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
        }
    }

    private getAccountId(): number|null {
        const id = this.props.match?.params.id;

        return id ? +(id) : null;
    }
    getTransactionData(id: number | null) {
        if(id !== null)
        TransactionService.getAllTransactionsByAccountId(id)
        .then(transactions => {
            
            this.setState({
                transactions: transactions,
                loading: false,
            })
            console.log("TR PAGE Transakcije: ", this.state.transactions)
        })
    }

    componentDidMount(){
       this.getTransactionData(this.getAccountId());
       
        EventRegister.on("AUTH_EVENT", this.authEventHandler.bind(this));
    }

    componentDidUpdate(prevProps: TransactionProperties, prevState: TransactionState){
        if(prevProps.match?.params.id !== this.props.match?.params.id){
            if(this.getAccountId() != null){
                this.getTransactionData(this.getAccountId());
            }
        }
    }

    componentWillUnmount(){
        EventRegister.off("AUTH_EVENT", this.authEventHandler.bind(this));
    }

    private authEventHandler(){

    }   
    
    
    private onChangeInput(field: "addedCat" | "addedVal"): 
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
                                    />
                                    <Form.Check
                                        inline
                                        label="Trošak"
                                        name="group1"
                                        type= 'radio'
                                        id='inline-radio-2'
                                    />
                                     </FormGroup>

                                    <FormGroup>
                                    <Button variant="primary" className="mt-3"
                                    onClick={() => this.handleAddButtonClick()}> Dodaj </Button>
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
    handleAddButtonClick(): void {

        





       this.setState({ toggleAdd: false})
    }
}