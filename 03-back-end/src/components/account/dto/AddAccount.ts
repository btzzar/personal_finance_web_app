import Ajv from "ajv";

interface IAddAccount {
    userId:number;
    currency: "eur"|"rsd"|"usd"|"gbp";
    name: string;
    description: string;
}

const ajv = new Ajv();

const IAddAccountValidator = ajv.compile({
    type: "object",
    properties: {
        userId:{
            type: "integer",
            minimum: 1,
        },
        currency:{
            type: "string",
            pattern: "eur|rsd|usd|gbp"
        },
        name:{
            type: "string",
            maxLength: 64
        },
        description:{
            type: "string",
            maxLength: 64
        },
    },
    required: ["userId", "currency", "name"],
    additionalProperties: false,
});

export { IAddAccount };
export { IAddAccountValidator };