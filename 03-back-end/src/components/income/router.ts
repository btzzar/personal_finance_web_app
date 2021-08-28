import * as express from "express"
import IApplicationResources from "../../common/IApplicationResources.interface";
import IncomeModel from "./model";
import IncomeController from "./controller";
import IRouter from "../../common/IRouter.interface";

export default class IncomeRouter implements IRouter{

    public setupRoutes(application: express.Application, resources: IApplicationResources){

        const incomeController = new IncomeController(resources);

        application.get("/income/:id",          incomeController.getById.bind(incomeController));
        application.get("/account/:aid/income", incomeController.getAllFromAccount.bind(incomeController));
        application.post("/income",             incomeController.add.bind(incomeController));
        application.delete("/income/:id",       incomeController.deleteById.bind(incomeController));
    }
}