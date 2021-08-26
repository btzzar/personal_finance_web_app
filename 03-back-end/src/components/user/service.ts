import UserModel from "./model";
import * as mysql2 from "mysql2/promise"
import IErrorResponse from "../../common/IErrorResponse.interface";

class UserService {
    private db: mysql2.Connection;

    constructor(db: mysql2.Connection){
        this.db = db;
    }

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
        return new Promise<UserModel[]|IErrorResponse>(async (resolve) => {
            
        const sql: string = "SELECT * FROM user";

        this.db.execute(sql)
        .then(async result => {

            const rows = result[0];

            const lista: UserModel[] = [];

            if (Array.isArray(rows)){
                for(const row of rows){
                    lista.push(await this.adaptModel(row))
                }
            }        
            
            resolve(lista);
        }).catch(error => {
            resolve({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage,
            });
        });
    });
    }

    public async getById(userId:number): Promise<UserModel|null|IErrorResponse>{
        return new Promise<UserModel|null|IErrorResponse>(async (resolve) => {
            
        const sql: string = "SELECT * FROM user WHERE user_id = ?";

        this.db.execute(sql, [userId])
        .then(async result => {

            const rows = result[0];

            resolve(
                await this.adaptModel(rows[0])
            );            
        })
        .catch(error => {
            resolve({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage,
            });
        })
        });
    }

}

export default UserService;