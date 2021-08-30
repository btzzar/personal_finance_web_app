import Ajv from "ajv";

interface IEditUser {
    username:string;
    email: string;
    passwordHash: string;
    firstName: String;
    lastName: String;
}

const ajv = new Ajv();

const IEditUserValidator = ajv.compile({
    type: "object",
    properties: {
        username:{
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        email:{
            type: "string",
            maxLength:64,
            pattern: "\.com"
        },
        password:{
            type: "string",
            maxLength: 255
        },
        firstName:{
            type: "string",
            maxLength: 64
        },
        lastName:{
            type: "string",
            maxLength: 64
        }
    },
    required: ["username", "email", "password", "firstName", "lastName"],
    additionalProperties: false,
});

export { IEditUser };
export { IEditUserValidator };