import { Request, Response, NextFunction } from "express";
import BaseController from "../../common/BaseController";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddUser, IAddUserValidator } from "./dto/AddUser";
import { IEditUser, IEditUserValidator } from "./dto/EditUser";
import UserModel from "./model";
import UserService from "./service";

class UserController extends BaseController{

    async getAll(req: Request, res: Response, next:NextFunction) {
        const users = await this.services.userService.getAll();

        res.send(users);
    }

    async getById(req: Request, res: Response, next: NextFunction){

        const id: string = req.params.id;

        const userId: number = +id;

        if(userId <= 0){
            res.sendStatus(400);
            return;
        }

        const user: UserModel|null|IErrorResponse = await this.services.userService.getById(userId);

        if(user === null){
            res.sendStatus(404);
            return;
        }

        if(user instanceof UserModel) {
            res.send(user);
            return;
        }

        res.status(500).send(user);
    }

    async add(req: Request, res: Response, next: NextFunction){
        const data = req.body;

        if(!IAddUserValidator(data)){
            res.status(400).send(IAddUserValidator.errors);
            return;
        }

        const result: UserModel | IErrorResponse = await this.services.userService.add(data as IAddUser);

        if(!(result instanceof UserModel)){
            if(result.errorMessage.includes("uq_user_email")){
                return res.status(400).send("A user with this email already exists.")
            }
            
            if(result.errorMessage.includes("uq_user_username")){
                return res.status(400).send("A user with this username already exists.")
            }

            return res.status(400).send(result);
        }

        ////console.log("kontroler" + result);

        res.send(result);
    }


    async edit(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const userId: number = +id;

        if(userId <= 0){
            res.status(400).send("Invalid ID");
            return;
        }

        const data = req.body;

        if(!IEditUserValidator(data)){
            res.status(400).send(IEditUserValidator.errors);
            return;
        }

        ////console.log("Controller edit: ", userId, data);

        const result = await this.services.userService.edit(userId, data as IEditUser);

        if(!(result instanceof UserModel)){
            if(result.errorMessage.includes("uq_user_email")){
                return res.status(400).send("A user with this email already exists.")
            }
            
            if(result.errorMessage.includes("uq_user_username")){
                return res.status(400).send("A user with this username already exists.")
            }

            return res.status(400).send(result);
        }

        if(result === null){
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }

    async deleteById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const userId: number = +id;

        if(userId <= 0){
            res.status(400).send("Invalid ID");
            return;
        }

        res.send(await this.services.userService.delete(userId));

    }


}

export default UserController;