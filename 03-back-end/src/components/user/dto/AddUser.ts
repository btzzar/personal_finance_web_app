import Ajv from "ajv";

interface IAddUser {
    username:string;
    email: string;
    passwordHash: string;
    firstName: String;
    lastName: String;
}

const ajv = new Ajv();

const IAddUserValidator = ajv.compile({
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
        },
        passwordHash:{
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
    required: ["username", "email", "passwordHash", "firstName", "lastName"],
    additionalProperties: false,
});

export { IAddUser };
export { IAddUserValidator };