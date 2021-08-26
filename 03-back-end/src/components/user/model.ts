import IModel from "../../common/IModel.interface";

class UserModel implements IModel{
    userId: number;
    created: Date;
    username:string;
    email: string;
    passwordHash: string;
    firstName: String;
    lastName: String;
}

export default UserModel;