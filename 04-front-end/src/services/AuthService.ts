import api, { saveAuthToken, saveRefreshToken } from "../api/api";
import EventRegister from "../api/EventRegister";

export interface IUserData {
    
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string; 

}

export interface IRegistrationResult {
    success: boolean,
    message?: string,
}


export default class AuthService {




    public static attemptUserRegister(data: IUserData): Promise<IRegistrationResult> {
        return new  Promise<IRegistrationResult>(resolve => (
            api("post", "/user", data)
            .then(res => {

                if(res?.status === "error"){
                    if(Array.isArray(res?.data.data)){
                        resolve({
                            success: false,
                            message:  res?.data?.data[0].instancePath.substring(res?.data?.data[0].instancePath.indexOf("/") + 1) as string + " " + res?.data?.data[0].message as string,
                        })
                    }
                    resolve({
                        success: false,
                        message: JSON.stringify(res?.data?.data as string),
                    })
                }

                resolve({
                    success: true,
                })

                //console.log(res)
            })
            )
        )
    }


    public static attemptUserLogin(email:string, password:string){
        api("post", "auth/user/login",{
            email: email,
            password: password
        }, false)
        .then(res => {
            if(res.status === "ok"){
                const authToken     = res?.data.authToken ?? "";
                const refreshToken  = res?.data.refreshToken ?? "";

                saveAuthToken(authToken);
                saveRefreshToken(refreshToken);

                EventRegister.emit("AUTH_EVENT", "user_login");
            }else{
                EventRegister.emit("AUTH_EVENT", "user_login_failed",res.data);
            }
        })
        .catch(err => {
            EventRegister.emit("AUTH_EVENT", "user_login_failed", err);
        });





    }
}