import {Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import ITokenData from '../components/auth/dto/ITokenData.interface';
import Config from '../config/dev';


export default class AuthMiddleware {

     public static verifyAuthToken(req: Request, res: Response, next: NextFunction){

        if(typeof req.headers.authorization !== "string"){
            return res.status(401).send("No auth token.");
        }

        const token: string = req.headers.authorization;

        const [tokenType, tokenString] = token.trim().split(" ");

        if( tokenType !== "Bearer"){
            return res.status(400).send("Invalid auth token type.");
        }

        if( typeof tokenString !== "string" || tokenString.length === 0){
            return res.status(400).send("Invalid auth token length.");
        }

        let result; 
        try { 
            result = jwt.verify(tokenString, Config.auth.user.auth.public);
        }
        catch(e){
            return res.status(500).send("Token validation error: " + e?.message);
        }

        if(typeof result !== "object"){
            return res.status(400).send("Bad auth token data.");
        }

        const data: ITokenData = result as ITokenData;

        req.authorized = data;
        
        next();
     }
}