import React from "react";
import { Link, Redirect } from "react-router-dom";
import BasePage, { BasePageProperties } from "../BaseComponent/BaseComponent";
import AccountModel from "../../../../03-back-end/src/components/account/model";
import AccountService from "../../services/AccountService";
import EventRegister from "../../api/EventRegister";
import TransactionService from "../../services/TransactionService";


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
}

export default class AccountPage extends BasePage<AccountProperties> {

    state: AccountState;

    constructor(props: AccountProperties){
        super(props);

        this.state = {
            title: "",
            accounts: [],
            isLoggedIn: true,
            transactions: [],
        }
    }

    private getAccountData(){
        const id = this.getAccountId();

        if(id === null){
            this.apiGetAllAccounts();
        }else{
            //this.apiGetAccountWithId(id);
            this.apiGetTransactionsWithAccountId(id);
        }
    }
    apiGetTransactionsWithAccountId(id: number) {
        TransactionService.getAllTransactionsByAccountId(id)
        .then(transactions => {
            
            this.setState({
                title: "Transactions",
                transactions: transactions,
            })

        })
    }

    apiGetLastTransactionWithAccountId(id: number): string|void{

        let t: any[] = [];
        TransactionService.getAllTransactionsByAccountId(id)
        .then(transactions => {
            //log("Transakcije od akaunta: ",id, transactions)
            // if(transactions.length === 0){
            //     return this.setState({
            //         title: "No transactions found",
            //         transactions: []
            //     })
            // }
            
            return ""+ transactions[0];
            // console.log("T:", t)
            // t.sort(function(a,b){
            //     return b.createdAt.getDate() - a.createdAt.getDate();
            // });
            // console.log("SORTED T:", t)
            
        })
        //console.log("Taaaaa:", t)
        return "asdf";
    }

    

    apiGetAccountWithId(id: number) {
        AccountService.getAccountById(id)
        .then(result => {
            if(result === null){
                return this.setState({
                    title: "Account not found",
                    accounts: []
                })
            }
            this.setState({
                title: result.name,
                accounts: [],
            })
        })

    }




    apiGetAllAccounts() {
        AccountService.getAllAccounts()
        .then(accounts => {
            if(accounts.length === 0){
                return this.setState({
                    title: "No accounts found",
                    accounts: []
                })
            }
            this.setState({
                title: "Accounts",
                accounts: accounts,
            })

        })
        //get the user id and create a string including it
        //currently this is simulated data
        

    }

    private getAccountId(): number|null {
        const id = this.props.match?.params.id;

        return id ? +(id) : null;
    }

    componentDidMount(){
        this.getAccountData();

        EventRegister.on("AUTH_EVENT", this.authEventHandler.bind(this));
    }

    componentDidUpdate(prevProps: AccountProperties, prevState: AccountState){
        if(prevProps.match?.params.id !== this.props.match?.params.id){
            this.getAccountData();
        }
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

    renderMain(): JSX.Element  {
        if(this.state.isLoggedIn === false){
            return (
                <Redirect to="/auth/user/login" />
            );
        }
        return (

            <>
            
                <h1> {this.state.title} </h1>

                <p>Racuni</p>
                <ul>
                    {
                        this.state.accounts.map(
                            acc => (
                                <li key={acc.accountId}>
                                    {   <Link to= {"/account/" + acc.accountId + "/transaction"}>
                                            Akaunt {acc.accountId}
                                        </Link> 
                                    }
                                </li>
                            )
                        )
                    }   
                </ul>


                {/* <p>{this.state.title}</p>
                <ul>
                    {
                        this.state.transactions.map(
                            tr => (
                                <li key={Math.random()}>
                                    <Link to= {"/account/" + tr.expenseId}>
                                        Transakcija {tr.expenseId}
                                    </Link>
                                </li>
                            )
                        )
                    }   
                </ul> */}
           
           
            </>

        );
    }

}