import AccountModel from "../../../03-back-end/src/components/account/model";
import api from "../api/api";
import EventRegister from "../api/EventRegister";

export default class AccountService{
    public static getAllAccounts(id: number): Promise<AccountModel[]>{
        return new Promise<AccountModel[]>(resolve => {
            api('get', '/user/'+id+'/account')
            .then(res => {
                if(res?.status !== 'ok'){
                    if(res.status === "login"){
                        EventRegister.emit("AUTH_EVENT", "force_login")
                    }
                    resolve([]);
                }
                //console.log(res?.data);
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

    public static getCurrencyById(accountId: number): Promise<string|null>{
        return new Promise<string|null>(resolve => {
            api('get', '/account/' + accountId)
            .then(res => {
                if(res?.status !== 'ok'){
                    if(res.status === "login"){
                        EventRegister.emit("AUTH_EVENT", "force_login")
                    }
                    resolve(null);
                }
                //console.log("CURRENCY: ", res?.data.currency)
                resolve(res?.data.currency);
            });
        })
    }

    public static addAccount(data: any): Promise<any> {
        return new Promise<any>(resolve => {
            api('post', "/account", data)
            .then(res => {
                if(res?.status !== 'ok'){
                    //console.log("NESTO NE RADI")
                    if(res.status === "login"){
                        EventRegister.emit("AUTH_EVENT", "force_login")
                        resolve([]);
                    }
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