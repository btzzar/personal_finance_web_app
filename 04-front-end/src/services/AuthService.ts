import api, { saveAuthToken, saveRefreshToken } from "../api/api";
import EventRegister from "../api/EventRegister";

export default class AuthService {

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