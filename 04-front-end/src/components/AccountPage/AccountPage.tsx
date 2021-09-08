import React from "react";
import { Link } from "react-router-dom";
import BasePage, { BasePageProperties } from "../BaseComponent/BaseComponent";

class AccountProperties extends BasePageProperties{
    match?:{
        params:{
            id: string;
        }
    }
}

class AccountState{
    title: string = "Loading...";
    transactions: any[] = [];
}

export default class AccountPage extends BasePage<AccountProperties> {

    state: AccountState;

    constructor(props: AccountProperties){
        super(props);

        this.state = {
            title: "",
            transactions: []
        }
    }

    private getAccountData(){
        const id = this.getAccountId();

        if(id === null){
            this.setState({
                title: "All accounts",
                transactions: []
            });
        }else{
            this.setState({
                title: "Transactions for account with id " + id,
                transactions: [
                    "1",
                    "2",
                    "3",
                    "4"
                ]
            });
        }

        //set title and 
    }

    private getAccountId(): number|null {
        const id = this.props.match?.params.id;

        return id ? +(id) : null;
    }

    componentDidMount(){
        this.getAccountData();
    }

    componentDidUpdate(prevProps: AccountProperties, prevState: AccountState){
        if(prevProps.match?.params.id !== this.props.match?.params.id){
            this.getAccountData();
        }
    }

    renderMain(): JSX.Element  {

        return (

            <>
            
                <h1> {this.state.title} </h1>

                <p>Transakcije</p>
                <ul>
                    {
                        this.state.transactions.map(
                            tr => (
                                <li>
                                    <Link to= {"/account/" + tr}>
                                        Transakcija {tr}
                                    </Link>
                                </li>
                            )
                        )
                    }   
                </ul>
           
            </>

        );
    }

}