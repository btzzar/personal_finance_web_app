import AccountModel from "../../../03-back-end/src/components/account/model";
import api from "../api/api";
import EventRegister from "../api/EventRegister";

export default class AccountService{
    public static getAllAccounts(): Promise<AccountModel[]>{
        return new Promise<AccountModel[]>(resolve => {
            api('get', '/user/1/account')
            .then(res => {
                if(res?.status !== 'ok'){
                    if(res.status === "login"){
                        EventRegister.emit("AUTH_EVENT", "force_login")
                    }
                    resolve([]);
                }
                console.log(res?.data);
                resolve(res?.data as AccountModel[]);
            });
        })
    }


    public static getAccountById(accountId: number): Promise<AccountModel | null>{
        return new Promise<AccountModel|null>(resolve => {
            api('get', '/account/' + accountId)
            .then(res => {
                if(res?.status !== 'ok'){
                    if(res.status === "login"){
                        EventRegister.emit("AUTH_EVENT", "force_login")
                    }
                    resolve(null);
                }

                resolve(res.data as AccountModel);
            });
        })
    }
}