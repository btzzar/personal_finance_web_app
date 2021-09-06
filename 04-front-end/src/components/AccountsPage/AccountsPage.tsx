import React from "react";
import BasePage, { BasePageProperties } from "../BaseComponent/BaseComponent";

class AccountsProperties extends BasePageProperties{
    match?:{
        params:{
            id: string;
        }
    }
}

export default class AccountsPage extends BasePage<AccountsProperties> {

    renderMain(): JSX.Element  {

        return (

            <p>Ovo je kasa sa ID brojem: {this.props.match?.params.id }</p>

        );
    }

}