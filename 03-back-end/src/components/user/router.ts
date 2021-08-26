import * as express from "express";
import UserService from "./service";
import UserController from "./controller";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";

export default class UserRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        
        const userService = new UserService(resources.databaseConnection);
        const userController = new UserController(userService);

        application.get("/user",        userController.getAll.bind(userController));
        application.get("/user/:id",    userController.getById.bind(userController));
        application.post("/user",       userController.add.bind(userController));

    }
}