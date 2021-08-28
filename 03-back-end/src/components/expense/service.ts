import IErrorResponse from "../../common/IErrorResponse.interface";
import BaseService from "../../services/BaseService";
import { IAddExpense } from "./dto/AddExpense";
import ExpenseModel from "./model";

class ExpenseService extends BaseService<ExpenseModel>{

    protected async adaptModel(data: any): Promise<ExpenseModel> {
        const item: ExpenseModel = new ExpenseModel();

        item.expenseId   = +(data?.expense_id);
        item.accountId   = +(data?.account_id);
        item.category    = data?.category;
        item.value       = +(data?.value);
        item.currency    = data?.currency;
        item.createdAt   = data?.created_at;

        //console.log(item);
        return item;
    }

    public async getById(expenseId: number): Promise<ExpenseModel|null|IErrorResponse> {
        return await this.getByIdFromTable("expense", expenseId);
    }

    public async getAllbyAccountId(accountId: number): Promise<ExpenseModel[]|IErrorResponse>{
        return await this.getAllByFieldName("expense", "account_id", accountId);
    }

    public async add(data: IAddExpense): Promise<ExpenseModel|IErrorResponse>{
        return new Promise<ExpenseModel|IErrorResponse>(resolve => {
            const sql = "INSERT expense SET account_id = ?, category = ?, value = ?, currency = ?";

            console.log(sql);

            this.db.execute(sql, [data.accountId, data.category, data.value, data.currency])
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

    async delete(expenseId: number): Promise<IErrorResponse> {
        
        return await this.deleteByIdFromTable("expense", expenseId);
    }




}

export default ExpenseService;