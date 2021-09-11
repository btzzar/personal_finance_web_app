import React from "react";
import { Link } from "react-router-dom";
import BasePage, { BasePageProperties } from "../BaseComponent/BaseComponent";
import AccountModel from "../../../../03-back-end/src/components/account/model";
import axios from "axios";

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
}

export default class AccountPage extends BasePage<AccountProperties> {

    state: AccountState;

    constructor(props: AccountProperties){
        super(props);

        this.state = {
            title: "",
            accounts: []
        }
    }

    private getAccountData(){
        const id = this.getAccountId();

        if(id === null){
            this.apiGetAllAccounts();
        }else{
            //this.apiGetAccountWithId();
        }

        //set title and 
    }
    apiGetAllAccounts() {
        //get the user id and create a string including it
        //currently this is simulated data
        
        axios({
            method: "get",
            baseURL: "http://localhost:40090",
            url: "/user/1/account",
            timeout: 10000,
            // headers:{
            //     Authorization: "Bearer..."
            // },
            // withCredentials: true,
            // maxRedirects: 0,
        })
        .then(res=>{
            if(!Array.isArray(res.data)){
                throw new Error("Invalid data");
            }

            this.setState({
                title: "Accounts",
                accounts: res.data,
            })

        }).catch(err => {
            const errorMsg = ""+err;

            if(errorMsg.includes("404")){
                this.setState({
                    title: "No accounts found",
                    accounts: []
                })
            }else{
                this.setState({
                    title: "Unable to load accounts",
                    accounts: []
                })
            }
        })
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
                        this.state.accounts.map(
                            acc => (
                                <li key={acc.accountId}>
                                    <Link to= {"/account/" + acc.accountId}>
                                        Akaunt {acc.accountId}
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