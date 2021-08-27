import BaseService from "../../services/BaseService";
import AccountModel from "./model";
import * as mysql2 from "mysql2/promise";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddAccount } from "./dto/AddAccount";
import { IEditAccount } from "./dto/EditAccount";

class AccountService extends BaseService<AccountModel> {

    protected async adaptModel(data: any): Promise<AccountModel> {
        const item: AccountModel = new AccountModel();


        item.accountId   = +(data?.account_id);
        item.userId      = +(data?.user_id);
        item.created     = data?.created_at;
        item.currency    = data?.currency;
        item.name        = data?.name;
        item.description = data?.description;
        item.total       = +(data?.total);

        //console.log(item);

        return item;
    }


    public async getById(accountId: number): Promise<AccountModel|null|IErrorResponse> {
        return await this.getByIdFromTable("account", accountId);
    }

    public async getAllbyUserId(userId: number): Promise<AccountModel[]|IErrorResponse>{
        return await this.getAllByFieldName("account", "user_id", userId);
    }

    public async add(data: IAddAccount): Promise<AccountModel|IErrorResponse>{
        return new Promise<AccountModel|IErrorResponse>(resolve => {
            const sql = "INSERT account SET user_id = ?, currency = ?, name = ?, description = ?";

            this.db.execute(sql, [data.userId, data.currency, data.name, data.description])
            .then(async result => {
                const insertInfo: any = result[0];
                const newId: number = +(insertInfo?.insertId);
                resolve(await this.getById(newId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage,
                    });
            })
        })
    }

    public async edit(accountId: number, data: IEditAccount): Promise<AccountModel|IErrorResponse|null>{
        return new Promise<AccountModel|IErrorResponse|null> (resolve => {
            const sql = "UPDATE account SET name = ?, description = ? WHERE account_id = ?";
            console.log("EDIT", sql)
            this.db.execute(sql, [data.name, data.description, accountId])
            .then(async result => {
                resolve(await this.getById(accountId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage,
                });
            })
        })
    }

    async delete(accountId: number): Promise<IErrorResponse> {
        
        return await this.deleteByIdFromTable("account", accountId);
    }

    



}

export default AccountService;