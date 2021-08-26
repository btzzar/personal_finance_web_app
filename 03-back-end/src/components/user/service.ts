import UserModel from "./model";
import * as mysql2 from "mysql2/promise"
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddUser } from "./dto/AddUser";
import BaseService from "../../services/BaseService";

class UserService extends BaseService<UserModel>{
    protected async adaptModel(row:any): Promise<UserModel>{

        const item: UserModel = new UserModel();

        item.userId = +(row?.user_id);
        item.created = row?.created_at;
        item.username = row?.username;
        item.email = row?.email;
        item.passwordHash = row?.password_hash;
        item.firstName = row?.first_name;
        item.lastName = row?.last_name;
  
        return item;
    }


    public async getAll(): Promise<UserModel[]|IErrorResponse> {
        return await this.getAllFromTable("user");
    }

    public async getById(userId:number): Promise<UserModel|null|IErrorResponse>{
        return await this.getByIdFromTable("user", userId);
    }

    public async add(data: IAddUser): Promise<UserModel|IErrorResponse> {
        return new Promise<UserModel|IErrorResponse>(async resolve => {
            const sql = "INSERT user SET username = ?, email = ?, password_hash = ?, first_name = ?, last_name = ?";

            this.db.execute(sql, [data.username, data.email, data.passwordHash, data.firstName, data.lastName])
            .then(async result => {
                const insertInfo: any = result[0];

                const newUserId: number = +(insertInfo?.insertId);
                
                const newUser = await this.getById(newUserId);

                console.log(newUser);
                
                resolve(newUser);
            })
            .catch(error =>{
                
            resolve({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage,
                });
            })

        })
    }

}

export default UserService;