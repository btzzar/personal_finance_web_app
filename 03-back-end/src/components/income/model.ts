import IModel from "../../common/IModel.interface";

class IncomeModel implements IModel{

    incomeId: number;
    accountId: number;
    category: string;
    value: number;
    currency: "eur"|"rsd"|"usd"|"gbp";
    createdAt: Date; 
}

export default IncomeModel;