import React from "react";
import BaseComponent from "../BaseComponent/BaseComponent";

export default class HomePage extends BaseComponent<{}>{

    renderMain(): JSX.Element  {

        return (

            <p> This is home page... </p>

        );
    }

}