import * as express from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import AccountService from "./service";
import AccountController from "./controller";

export default class AccountRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        
        const accountService = new AccountService(resources.databaseConnection);
        const accountController = new AccountController(accountService);

        application.get("/account/:id",        accountController.getById.bind(accountController));
        application.get("/user/:uid/account",  accountController.getAllFromUser.bind(accountController));
        application.post("/account",           accountController.add.bind(accountController));
        application.put("/account/:id",        accountController.edit.bind(accountController));
        application.delete("/account/:id",     accountController.deleteById.bind(accountController));
    }
}