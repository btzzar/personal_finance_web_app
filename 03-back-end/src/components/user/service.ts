import UserModel from "./model";

class UserService {
    public async getAll(): Promise<UserModel[]> {
        const lista: UserModel[] = [];

        //Mock

        lista.push({
            userId: 1,
            created: new Date(),
            username: "btz",
            email: "btz@btz.com",
            passwordHash: "asdfasdfasdfasdf123e21d1d1",
            firstName: "l",
            lastName: "b"
        });

        lista.push({
            userId: 2,
            created: new Date(),
            username: "btz1",
            email: "btz1@btz.com",
            passwordHash: "1asdfasdfasdfasdf123e21d1d1",
            firstName: "l1",
            lastName: "b1"
        });

        return lista;
    }

    public async getById(userId:number): Promise<UserModel|null>{

        if(userId === 1){
            return {
                userId: 1,
                created: new Date(),
                username: "btz",
                email: "btz@btz.com",
                passwordHash: "asdfasdfasdfasdf123e21d1d1",
                firstName: "l",
                lastName: "b"
            }
        } else if(userId === 2){
            return {
                userId: 2,
                created: new Date(),
                username: "btz1",
                email: "btz1@btz.com",
                passwordHash: "1asdfasdfasdfasdf123e21d1d1",
                firstName: "l1",
                lastName: "b1"
            }

        }else return null
    }

}

export default UserService;