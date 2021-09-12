import BaseController from "../../common/BaseController";
import {Request, Response} from "express";
import { IUserLogin, IUserLoginValidator } from "./dto/IUserLogin";
import * as bcrypt from "bcrypt";
import ITokenData from "./dto/ITokenData.interface";
import * as jwt from "jsonwebtoken";
import Config from "../../config/dev";
import { IRefreshToken, IRefreshTokenValidator } from "./dto/IRefreshToken";

export default class AuthController extends BaseController{
    public async userLogin(req: Request, res:Response){
        if(!(IUserLoginValidator(req.body))){
            return res.status(400).send(IUserLoginValidator.errors);
        }

        const data = req.body as IUserLogin;

        const user = await this.services.userService.getByEmail(data.email);

        if(user === null) return res.sendStatus(404);

        if(!bcrypt.compareSync(data.password, user.passwordHash)){
            await new Promise(resolve => setTimeout(resolve, 1000));
            return res.status(403).send("Invalid user password.");
        }

        const authTokenData: ITokenData = {
            id: user.userId,
            identity: user.email
        };

        const refreshTokenData: ITokenData = {
            id: user.userId,
            identity: user.email,
        };

        const authToken = jwt.sign(
            authTokenData,
            Config.auth.user.auth.private,
            {
                algorithm: Config.auth.user.algorithm,
                issuer:  Config.auth.user.issuer,
                expiresIn:  Config.auth.user.auth.duration,
            }
        );

        const refreshToken = jwt.sign(
            refreshTokenData,
            Config.auth.user.refresh.private,
            {
                algorithm: Config.auth.user.algorithm,
                issuer: Config.auth.user.issuer,
                expiresIn: Config.auth.user.refresh.duration,
            },
        );

        res.send({
            authToken: authToken,
            refreshToken: refreshToken,
        });

               
    }

    async userRefresh(req:Request, res:Response){

        if(!IRefreshTokenValidator(req.body)){
            return res.status(400).send(IRefreshTokenValidator.errors);
        }
        const tokenString: string = (req.body as IRefreshToken).refreshToken;
        

        try { 
            const existingData = jwt.verify(tokenString, Config.auth.user.auth.public) as ITokenData;

            const newTokenData: ITokenData = {
                id: existingData.id,
                identity: existingData.identity,
            }

            const authToken = jwt.sign(
                newTokenData,
                Config.auth.user.auth.private,
                {
                    algorithm: Config.auth.user.algorithm,
                    issuer:  Config.auth.user.issuer,
                    expiresIn:  Config.auth.user.auth.duration,
                }
            );

            res.send({
                authToken: authToken,
                refreshToken: null,
            });
        }
        catch(e){
            return res.status(400).send("Invalid refresh token: " + e?.message);
        }

    }

    public sendOk(req: Request, res: Response){
        res.send("OK");
    }
}