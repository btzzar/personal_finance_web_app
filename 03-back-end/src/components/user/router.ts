import * as express from "express";
import UserService from "./service";
import UserController from "./controller";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class UserRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        
        const userController = new UserController(resources);

        application.get("/user",      userController.getAll.bind(userController));
        application.get("/user/:id",AuthMiddleware.verifyAuthToken,     userController.getById.bind(userController));
        application.post("/user",                                       userController.add.bind(userController));
        application.put("/user/:id", AuthMiddleware.verifyAuthToken,    userController.edit.bind(userController));
        application.delete("/user/:id",AuthMiddleware.verifyAuthToken,  userController.deleteById.bind(userController));


    }
}