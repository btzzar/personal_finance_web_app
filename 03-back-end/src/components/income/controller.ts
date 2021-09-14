import { Request, Response, NextFunction } from "express";
import BaseController from "../../common/BaseController";
import { IAddIncome, IAddIncomeValidator } from "./dto/AddIncome";
import IncomeModel from "./model";

class IncomeController extends BaseController{

    async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const incomeId: number = +id;

        if(incomeId <= 0){
            res.sendStatus(400);
            return;
        }

        //console.log(incomeId);

        const result = await this.services.incomeService.getById(incomeId);

        
        
        if(result === null){
            res.sendStatus(404);
            return;
        }

        if(result instanceof IncomeModel){
            res.send(result);
            return;
        }

        res.status(500).send(result);      
    }

    public async getAllFromAccount(req: Request, res: Response, next: NextFunction){

        const accountId: number = +(req.params.aid);

        res.send(await this.services.incomeService.getAllbyAccountId(accountId));

    }

    public async add(req: Request, res: Response, next: NextFunction){

        const item = req.body;

        if(!IAddIncomeValidator(item)){
            res.status(400).send(IAddIncomeValidator.errors);
            return;
        }


        res.send(await this.services.incomeService.add(item as IAddIncome));

    }

    async deleteById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const incomeId: number = +id;

        if(incomeId <= 0){
            res.status(400).send("Invalid ID");
            return;
        }

        res.send(await this.services.incomeService.delete(incomeId));

    }

}

export default IncomeController;