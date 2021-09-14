import axios, { AxiosResponse } from "axios";
import { AppConfiguration } from "../config/app.config"
//import EventRegister from "./EventRegister";

type ApiMethod = 'get' | 'post' | 'put' | 'delete';
type ApiResponseStatus = 'ok' | 'error' | 'login';

interface ApiResponse{
    status: ApiResponseStatus,
    data: any
}



export default function api(
    method: ApiMethod,
    path: string, 
    body: any | undefined = undefined,
    attemptToRefresh: boolean = true,
): Promise<ApiResponse> {
    return new Promise<ApiResponse> (resolve => {
        //console.log("Executing request", path);
        axios({
            method: method,
            baseURL: AppConfiguration.API_URL,
            url: path,
            data: body ? JSON.stringify(body) : '',
            headers:{
                'Content-Type':'application/json',
                "Authorization": 'Bearer ' + getAuthToken(),
            }
        })
        .then(res => responseHandler(res, resolve))
        .catch(async err =>{
            const emsg: string = "" + err;
            if(attemptToRefresh && emsg.includes("401")){
                //console.log("refresh is happening");

                const newToken: string| null = await refreshToken();

                if(newToken === null){
                    //EventRegister.emit("AUTH_EVENT", "force_login");
                    return resolve({
                        status: 'login',
                        data: null,
                    });
                }

                saveAuthToken(newToken);
                ////console.log("new token saved")
                //EventRegister.emit("AUTH_EVENT", "force_login");


                
                //repeat request
                api(method, path, body, false)
                    .then(res => { 
                        resolve(res);
                    })
                    .catch(err => {

                        resolve({
                            status: 'login',
                            data: null,
                        });
                    })

                return;
            }
            if (err?.response?.status === 401) {
                return resolve({
                    status: 'login',
                    data: null,
                });
            }

            if (err?.response?.status === 403) {
                return resolve({
                    status: 'login',
                    data: 'Access denied',
                });
            }

            resolve({
                status: 'error',
                data: err?.response
            });
        })
    })
}

function responseHandler(res: AxiosResponse<any>, resolve:(data: ApiResponse) => void){
    if (res?.status < 200 || res?.status >= 300) {
        return resolve({
            status: 'error',
            data: '' + res,
        });
    }
    //console.log("Received response")
    resolve({
        status: 'ok',
        data: res.data,
    });
}

function getAuthToken(): string {
    return localStorage.getItem("user-auth-token") ?? '';
}

function getRefreshToken(): string {
    return localStorage.getItem("user-refresh-token") ?? '';
}

export function saveAuthToken(token:string){
    localStorage.setItem("user-auth-token", token);
}


export function saveRefreshToken(token:string){
    localStorage.setItem("user-refresh-token", token);
}

export function saveIdentity(identity: string){
    localStorage.setItem("user-identity", identity)
}

export function getIdentity(): string{
    return localStorage.getItem("user-identity") ?? '';  
}

export function saveId(id: string){
    //console.log("Saving user id....", id, typeof id);
    sessionStorage.setItem("user_id", id)
}

export function getId(): string{
    return sessionStorage.getItem("user_id") ?? '';  
}

function refreshToken(): Promise<string|null> {
    return new Promise<string|null>(resolve => {
        axios({
            method: 'post',
            baseURL: AppConfiguration.API_URL,
            url: "/auth/user/refresh",
            data: JSON.stringify({
                refreshToken: getRefreshToken()
            }),
            headers:{
                'Content-Type':'application/json',
            }
        })
        .then(res => refreshTokenResponseHandler(res, resolve))
        .catch(async err =>{
            resolve(null);
        });
    });
}

function refreshTokenResponseHandler(res: AxiosResponse<any>, resolve: (data: string|null) => void){
    if(res.status !== 200){
        return resolve(null);
    }

    resolve(res.data?.authToken);
}