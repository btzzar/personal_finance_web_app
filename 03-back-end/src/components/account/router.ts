import * as express from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import AccountService from "./service";
import AccountController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class AccountRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        
        const accountController = new AccountController(resources);

        application.get("/account/:id",       AuthMiddleware.verifyAuthToken, accountController.getById.bind(accountController));
        application.get("/user/:uid/account", AuthMiddleware.verifyAuthToken, accountController.getAllFromUser.bind(accountController));
        application.post("/account",          AuthMiddleware.verifyAuthToken, accountController.add.bind(accountController));
        application.put("/account/:id",       AuthMiddleware.verifyAuthToken, accountController.edit.bind(accountController));
        application.delete("/account/:id",    AuthMiddleware.verifyAuthToken, accountController.deleteById.bind(accountController));
    }
}