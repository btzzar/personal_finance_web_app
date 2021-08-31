import * as express from "express"
import IApplicationResources from "../../common/IApplicationResources.interface";
import IncomeModel from "./model";
import IncomeController from "./controller";
import IRouter from "../../common/IRouter.interface";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class IncomeRouter implements IRouter{

    public setupRoutes(application: express.Application, resources: IApplicationResources){

        const incomeController = new IncomeController(resources);

        application.get("/income/:id",   AuthMiddleware.verifyAuthToken,       incomeController.getById.bind(incomeController));
        application.get("/account/:aid/income",AuthMiddleware.verifyAuthToken, incomeController.getAllFromAccount.bind(incomeController));
        application.post("/income",          AuthMiddleware.verifyAuthToken,   incomeController.add.bind(incomeController));
        application.delete("/income/:id",     AuthMiddleware.verifyAuthToken,  incomeController.deleteById.bind(incomeController));
    }
}