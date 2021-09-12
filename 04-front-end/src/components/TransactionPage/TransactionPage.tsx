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
    // currentPage: number = 1;
    // transactionsPerPage: number = 10;    
}



export default class TransactionPage extends BasePage<TransactionProperties>{

    state: TransactionState;

    constructor(props:any){
        super(props)

        this.state = {
            transactions: [],
            loading: true,
            // currentPage: 1,
            // transactionsPerPage: 10,
        }
    }

    private getAccountId(): number|null {
        const id = this.props.match?.params.id;

        return id ? +(id) : null;
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


    getTransactionData(id: number | null) {
        if(id !== null)
        TransactionService.getAllTransactionsByAccountId(id)
        .then(transactions => {
            console.log("TR PAGE Transakcije: ", transactions)
            this.setState({
                transactions: transactions,
                loading: false,
            })
        })
    }


    renderMain(): JSX.Element {
        // const idxOfLastTransaction = this.state.currentPage * this.state.transactionsPerPage;

        // const idxOfFirstTransaction = idxOfLastTransaction - this.state.transactionsPerPage;

        // const currentTransactions = this.state.transactions.slice(idxOfFirstTransaction,idxOfLastTransaction);

        const columns = [
            { dataField: "category", text: "Kategorija"},
            { dataField: "value", text: "Vrednost"},
            { dataField: "createdAt", text: "Datum transakcije"}

        ]

        return(
            <BootstrapTable
                keyField={"expenseId"}
                data={this.state.transactions}
                columns={columns}
                pagination={paginationFactory({})}
            />
        )
    }
}