import Ajv from "ajv";

interface IEditAccount {
    userId:number;
    currency: "eur"|"rsd"|"usd"|"gbp";
    name: string;
    description: string;
}

const ajv = new Ajv();

const IEditAccountValidator = ajv.compile({
    type: "object",
    properties: {
        name:{
            type: "string",
            maxLength: 64
        },
        description:{
            type: "string",
            maxLength: 64
        },
    },
    required: ["name"],
    additionalProperties: false,
});

export { IEditAccount };
export { IEditAccountValidator };