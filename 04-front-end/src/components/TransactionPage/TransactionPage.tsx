import EventRegister from "../../api/EventRegister";
import TransactionService from "../../services/TransactionService";
import BasePage, { BasePageProperties } from "../BaseComponent/BaseComponent";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootstrap from "react-bootstrap"



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
     
}



export default class TransactionPage extends BasePage<TransactionProperties>{

    state: TransactionState;

    constructor(props:any){
        super(props)

        this.state = {
            transactions: [],
            loading: true,
            reloaded: false,
            
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
            <BootstrapTable
                keyField={"expenseId"}
                data={this.state.transactions}
                columns={columns}
                pagination={paginationFactory({})}
                //sort={ { dataField: "category", order: 'desc' }}
            />
            </>
            
        )
    }
    }
}