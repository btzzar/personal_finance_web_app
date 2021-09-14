import { Request, Response, NextFunction } from "express";
import BaseController from "../../common/BaseController";
import { IAddExpense, IAddExpenseValidator } from "./dto/AddExpense";
import ExpenseModel from "./model";

class ExpenseController extends BaseController{

    async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const expenseId: number = +id;

        if(expenseId <= 0){
            res.sendStatus(400);
            return;
        }

        //console.log(expenseId);

        const result = await this.services.expenseService.getById(expenseId);

        
        
        if(result === null){
            res.sendStatus(404);
            return;
        }

        if(result instanceof ExpenseModel){
            res.send(result);
            return;
        }

        res.status(500).send(result);      
    }

    public async getAllFromAccount(req: Request, res: Response, next: NextFunction){

        const accountId: number = +(req.params.aid);

        res.send(await this.services.expenseService.getAllbyAccountId(accountId));

    }

    public async add(req: Request, res: Response, next: NextFunction){

        const item = req.body;

        if(!IAddExpenseValidator(item)){
            res.status(400).send(IAddExpenseValidator.errors);
            return;
        }


        res.send(await this.services.expenseService.add(item as IAddExpense));

    }

    async deleteById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const expenseId: number = +id;

        if(expenseId <= 0){
            res.status(400).send("Invalid ID");
            return;
        }

        res.send(await this.services.expenseService.delete(expenseId));

    }

}

export default ExpenseController;