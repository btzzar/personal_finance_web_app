import { Request, Response, NextFunction } from "express";
import BaseController from "../../common/BaseController";
import { IAddAccount, IAddAccountValidator } from "./dto/AddAccount";
import { IEditAccount, IEditAccountValidator } from "./dto/EditAccount";
import AccountModel from "./model";
import AccountService from "./service";

class AccountController extends BaseController{
    
    async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const accountId: number = +id;

        if(accountId <= 0){
            res.sendStatus(400);
            return;
        }

        const result = await this.services.accountService.getById(accountId);

        
        if(result === null){
            res.sendStatus(404);
            return;
        }

        if(result instanceof AccountModel){
            res.send(result);
            return;
        }

        res.status(500).send(result);      
    }

    public async getAllFromUser(req: Request, res: Response, next: NextFunction){

        const userId: number = +(req.params.uid);

        res.send(await this.services.accountService.getAllbyUserId(userId));

    }

    public async add(req: Request, res: Response, next: NextFunction){

        const item = req.body;

        if(!IAddAccountValidator(item)){
            res.status(400).send(IAddAccountValidator.errors);
            return;
        }


        res.send(await this.services.accountService.add(item as IAddAccount));

    }

    public async edit(req: Request, res: Response){
        const id: string = req.params.id;

        const accountId: number = +id;

        if(accountId <= 0){
            res.sendStatus(400);
            return;
        }

        if(!IEditAccountValidator(req.body)){
            res.status(400).send(IEditAccountValidator.errors);
            return;
        }

        const result = await this.services.accountService.getById(accountId);

        //console.log("RESULT: ", result)
        
        if(result === null){
            res.sendStatus(404);
            return;
        }

        if(!(result instanceof AccountModel)){
            res.status(500).send(result);
            return;
        }

        
        
        res.send(await this.services.accountService.edit(accountId, req.body as IEditAccount));
    }



    async deleteById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const accountId: number = +id;

        if(accountId <= 0){
            res.status(400).send("Invalid ID");
            return;
        }

        res.send(await this.services.accountService.delete(accountId));

    }


}

export default AccountController;