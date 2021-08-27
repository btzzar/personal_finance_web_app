import IModel from "../common/IModel.interface";
import * as mysql2 from "mysql2/promise"
import IErrorResponse from "../common/IErrorResponse.interface";
import IApplicationResources from "../common/IApplicationResources.interface";
import IServices from "../common/IServices.interface";

export default abstract class BaseService<T extends IModel> {

    private dbConnection: mysql2.Connection;
    private allServices: IServices;

    constructor(resources: IApplicationResources){
        this.dbConnection = resources.databaseConnection;
        this.allServices = resources.services;
    }

    protected get db(): mysql2.Connection {
        return this.dbConnection;
    }

    protected get services(): IServices{
        return this.allServices;
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
    
            //console.log("sql id ", id)
            //console.log(sql);

            this.db.execute(sql,[id])
            .then(async result => {
    
                //console.log("RESULT: ", result);
                const rows = result[0];
    
                console.log("ROWS: ", await this.adaptModel(rows[0]));

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

    protected getAllByFieldName(tableName: string, fieldName: string, fieldValue: any): Promise<T[]|null|IErrorResponse>{
        return new Promise<T[]|null|IErrorResponse>(async (resolve) => {
            
            const sql: string = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?;`;
    
            this.db.execute(sql, [fieldValue])
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

    async deleteByIdFromTable(tableName: string, id:number): Promise<IErrorResponse> {

        return new Promise<IErrorResponse> (resolve => {
            const sql = `DELETE FROM ${tableName} where ${tableName}_id = ?;`;

            console.log(sql);

            this.db.execute(sql, [id])
            .then(async result => {

                const deleteInfo: any = result[0];

                const deletedRowCount: number = +(deleteInfo?.affectedRows);

                if(deletedRowCount === 1){
                    resolve({
                        errorCode: 0,
                        errorMessage: "Record is deleted",
                        });
                } else {
                    resolve({
                        errorCode: -1,
                        errorMessage: "This record could not be deleted.",
                        });
                }
            })
            
            .catch(error => {         
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage,
                });
            });
        });

    }




}