import Ajv from "ajv";

interface IAddIncome {
    accountId:number;
    category: string;
    value: number;
    currency: "eur"|"rsd"|"usd"|"gbp";
}

const ajv = new Ajv();

const IAddIncomeValidator = ajv.compile({
    type: "object",
    properties: {
        accountId:{
            type: "integer",
            minimum: 1,
        },
        category:{
            type: "string",
            maxLength: 64
        },
        value:{
            type: "number",
            minimum: 0.01,
            multipleOf: 0.01
        },
        currency:{
            type: "string",
            pattern: "eur|rsd|usd|gbp"
        },
    },
    required: ["accountId", "category","value", "currency"],
    additionalProperties: false,
});

export { IAddIncome};
export { IAddIncomeValidator };