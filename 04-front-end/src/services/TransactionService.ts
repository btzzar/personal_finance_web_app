import ExpenseModel from "../../../03-back-end/src/components/expense/model";
import IncomeModel from "../../../03-back-end/src/components/income/model";
import api from "../api/api";
import EventRegister from "../api/EventRegister";

export default class TransactionService{
    public static getAllTransactionsByAccountId(accountId: number): Promise<any[]>{

        const finalData: any[] = [];

        return new Promise<any[]>(resolve => {
            const pathExpense = "/account/" + accountId + "/expense";
            const pathIncome = "/account/" + accountId + "/income";

            api('get', pathExpense)
            .then(res => {
                if(res?.status !== 'ok'){
                    if(res.status === "login"){
                        EventRegister.emit("AUTH_EVENT", "force_login")
                    }
                    resolve([]);
                }
                finalData.push(...(res?.data as ExpenseModel[]))
                
                //finalData.push(res?.data as ExpenseModel[])
            });

            api('get', pathIncome)
            .then(res => {
                if(res?.status !== 'ok'){
                    if(res.status === "login"){
                        EventRegister.emit("AUTH_EVENT", "force_login")
                    }
                    resolve([]);
                }
                finalData.push(...(res?.data as IncomeModel[]))
                //finalData.push(res?.data as IncomeModel[])
            });

            //console.log(finalData);
            resolve(finalData);
        })
    }  

    public static addTransaction(transaction: "expense" | "income", data: any): Promise<any> {
        return new Promise<any>(resolve => {
            api('post', "/"+transaction, data)
            .then(res => {
                if(res?.status !== 'ok'){
                    //console.log("NESTO NE RADI")
                    if(res.status === "login"){
                        EventRegister.emit("AUTH_EVENT", "force_login")
                    }
                    resolve([]);

                    resolve({
                        success: false,
                        message: JSON.stringify(res?.data?.data as string),
                    })  
                }
                resolve({
                    success: true,
                  });
                
            });
        });
   }
}