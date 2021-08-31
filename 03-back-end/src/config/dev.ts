import { readFileSync } from "fs";
import IConfig from "../common/IConfig.interface";

const Config: IConfig = {
    server:{
        port: 40090,
        static: {
            route: "/static",
            path: "./static/",
            cacheControl: false,
            dotfiles: "deny",
            etag:false, 
            index: false,
            maxAge: 360000,
        }
    },
    database:{
        host: "localhost",
        port: 3306,
        user: "root",
        password: "dvogled",
        database: "aplikacija",
        charset: "utf8",
        timezone: "+01:00"
    },
    auth: {
        user: {
            algorithm: "RS256",
            issuer: "localhost",
            auth: {
                duration: 60 * 60 * 60 * 5, 
                public: readFileSync("keystore/user-auth.public", "utf-8"),
                private: readFileSync("keystore/user-auth.private", "utf-8"),
            }
        },
        allowRequestsEvenWithoutValidTokens: false,
    }
}

export default Config;