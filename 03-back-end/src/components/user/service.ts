import UserModel from "./model";
import * as mysql2 from "mysql2/promise"

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


    public async getAll(): Promise<UserModel[]> {
        const lista: UserModel[] = [];

        const sql: string = "SELECT * FROM user";
        const [rows, columns] = await this.db.execute(sql);

        if (Array.isArray(rows)){
            for(const row of rows){
                lista.push(await this.adaptModel(row))
            }
        }        
        
        return lista;
    }

    public async getById(userId:number): Promise<UserModel|null>{
        
        const sql: string = "SELECT * FROM user WHERE user_id = ?";
        const [rows, columns] = await this.db.execute(sql, [userId]);

        return await this.adaptModel(rows[0]);
    }

}

export default UserService;