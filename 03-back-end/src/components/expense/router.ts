import * as express from "express"
import IApplicationResources from "../../common/IApplicationResources.interface";
import ExpenseModel from "./model";
import ExpenseController from "./controller";
import IRouter from "../../common/IRouter.interface";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class ExpenseRouter implements IRouter{

    public setupRoutes(application: express.Application, resources: IApplicationResources){

        const expenseController = new ExpenseController(resources);

        application.get("/expense/:id",          AuthMiddleware.verifyAuthToken, expenseController.getById.bind(expenseController));
        application.get("/account/:aid/expense", AuthMiddleware.verifyAuthToken, expenseController.getAllFromAccount.bind(expenseController));
        application.post("/expense",             AuthMiddleware.verifyAuthToken,  expenseController.add.bind(expenseController));
        application.delete("/expense/:id",       AuthMiddleware.verifyAuthToken, expenseController.deleteById.bind(expenseController));
    }
}