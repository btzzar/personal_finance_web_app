import IErrorResponse from "../../common/IErrorResponse.interface";
import BaseService from "../../services/BaseService";
import { IAddIncome } from "./dto/AddIncome";
import IncomeModel from "./model";

class IncomeService extends BaseService<IncomeModel>{

    protected async adaptModel(data: any): Promise<IncomeModel> {
        const item: IncomeModel = new IncomeModel();

        item.incomeId   = +(data?.income_id);
        item.accountId   = +(data?.account_id);
        item.category    = data?.category;
        item.value       = +(data?.value);
        item.currency    = data?.currency;
        item.createdAt   = data?.created_at;

        ////console.log(item);
        return item;
    }

    public async getById(incomeId: number): Promise<IncomeModel|null|IErrorResponse> {
        return await this.getByIdFromTable("income", incomeId);
    }

    public async getAllbyAccountId(accountId: number): Promise<IncomeModel[]|IErrorResponse>{
        return await this.getAllByFieldName("income", "account_id", accountId);
    }

    public async add(data: IAddIncome): Promise<IncomeModel|IErrorResponse>{
        return new Promise<IncomeModel|IErrorResponse>(resolve => {
            const sql = "INSERT income SET account_id = ?, category = ?, value = ?, currency = ?";

            //console.log(sql);

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

    async delete(incomeId: number): Promise<IErrorResponse> {
        
        return await this.deleteByIdFromTable("income", incomeId);
    }




}

export default IncomeService;