import { Request, Response, NextFunction } from "express";
import IErrorResponse from "../../common/IErrorResponse.interface";
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
}

export default UserController;