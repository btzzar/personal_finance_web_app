import { Request, Response, NextFunction } from "express";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddUser, IAddUserValidator } from "./dto/AddUser";
import { IEditUser, IEditUserValidator } from "./dto/EditUser";
import UserModel from "./model";
import UserService from "./service";

class UserController{
    private userService: UserService;

    constructor(userService: UserService){
        this.userService = userService;
    }

    async getAll(req: Request, res: Response, next:NextFunction) {
        const users = await this.userService.getAll();

        res.send(users);
    }

    async getById(req: Request, res: Response, next: NextFunction){

        const id: string = req.params.id;

        const userId: number = +id;

        if(userId <= 0){
            res.sendStatus(400);
            return;
        }

        const user: UserModel|null|IErrorResponse = await this.userService.getById(userId);

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

        const result = await this.userService.add(data as IAddUser);

        console.log("kontroler" + result);

        res.send(result);
    }


    async edit(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const userId: number = +id;

        if(userId <= 0){
            res.sendStatus(400);
            return;
        }

        const data = req.body;

        if(!IEditUserValidator(data)){
            res.status(400).send(IEditUserValidator.errors);
            return;
        }

        //console.log("Controller edit: ", userId, data);

        const result = await this.userService.edit(userId, data as IEditUser);

        if(result === null){
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }

}

export default UserController;