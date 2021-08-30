import Ajv from "ajv";

interface IAddUser {
    username:string;
    email: string;
    password: string;
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

export { IAddUser };
export { IAddUserValidator };