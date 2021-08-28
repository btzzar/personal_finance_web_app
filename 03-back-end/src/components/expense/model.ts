import IModel from "../../common/IModel.interface";

class ExpenseModel implements IModel{

    expenseId: number;
    accountId: number;
    category: string;
    value: number;
    currency: "eur"|"rsd"|"usd"|"gbp";
    createdAt: Date; 
}

export default ExpenseModel;