import IModel from "../common/IModel.interface";
import * as mysql2 from "mysql2/promise"
import IErrorResponse from "../common/IErrorResponse.interface";

export default abstract class BaseService<T extends IModel> {

    private dbConnection: mysql2.Connection;

    constructor(db: mysql2.Connection){
        this.dbConnection = db;
    }

    protected get db(): mysql2.Connection {
        return this.dbConnection;
    }

    protected abstract adaptModel(data: any): Promise<T>;

    protected async getAllFromTable(tableName: string): Promise<T[]|IErrorResponse>{
        
        return new Promise<T[]|IErrorResponse>(async (resolve) => {
            
            const sql: string = `SELECT * FROM ${tableName};`;
    
            this.db.execute(sql)
            .then(async result => {
    
                const rows = result[0];
    
                const lista: T[] = [];
    
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


    protected async getByIdFromTable(tableName: string, id:number): Promise<T|null|IErrorResponse>{
        return new Promise<T|null|IErrorResponse>(async (resolve) => {
            
            const sql: string = `SELECT * FROM ${tableName} WHERE ${tableName}_id = ?;`;
    
            this.db.execute(sql,[id])
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

    protected getAllByFieldName(tableName: string, fieldName: string, fieldValue: any): Promise<T|null|IErrorResponse>{
        return new Promise<T|null|IErrorResponse>(async (resolve) => {
            
            const sql: string = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?;`;
    
            this.db.execute(sql,[fieldValue])
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