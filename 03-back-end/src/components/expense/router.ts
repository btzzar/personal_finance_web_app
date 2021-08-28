import * as express from "express"
import IApplicationResources from "../../common/IApplicationResources.interface";
import ExpenseModel from "./model";
import ExpenseController from "./controller";
import IRouter from "../../common/IRouter.interface";

export default class ExpenseRouter implements IRouter{

    public setupRoutes(application: express.Application, resources: IApplicationResources){

        const expenseController = new ExpenseController(resources);

        application.get("/expense/:id",          expenseController.getById.bind(expenseController));
        application.get("/account/:aid/expense", expenseController.getAllFromAccount.bind(expenseController));
        application.post("/expense",             expenseController.add.bind(expenseController));
        application.delete("/expense/:id",       expenseController.deleteById.bind(expenseController));
    }
}