import IModel from "../../common/IModel.interface";

class AccountModel implements IModel{
    accountId: number;
    userId: number;
    created: Date;
    currency: "eur"|"rsd"|"usd"|"gbp";
    name: string;
    description: string;
    total: number;
}

export default AccountModel;