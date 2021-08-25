import { Request, Response, NextFunction } from "express";
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
}

export default UserController;