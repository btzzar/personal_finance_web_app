import Ajv from "ajv";

interface IUserLogin {
    username:string;
    email: string;
    password: string;
    firstName: String;
    lastName: String;
}

const ajv = new Ajv();

const IUserLoginValidator = ajv.compile({
    type: "object",
    properties: {
       
        email:{
            type: "string",
            minLength: 5,
            maxLength:64,
        },
        password:{
            type: "string",
            minLength: 3,
            maxLength: 255
        }
    },
    required: ["email", "password"],
    additionalProperties: false,
});

export { IUserLogin };
export { IUserLoginValidator };