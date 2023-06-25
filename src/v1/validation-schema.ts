import Joi from "joi";

const optionalString = Joi.string().trim();
const requiredString = optionalString.required();
const requiredEmail = requiredString.email();
// const optionalNumber = Joi.number().min(1).integer();
// const requiredNumber = optionalNumber.required();
// const requiredDate = Joi.date().required();
const requiredRegexPhone = optionalString.required().regex(/(234|0)[7-9][0-1][0-9]{8}/);

const CREATE = Joi.object().keys({
    name: requiredString,
    address: requiredString,
    email: requiredEmail,
    phone: requiredRegexPhone,
    password: requiredString,
});

const LOGIN = Joi.object({
    email: requiredEmail,
    password: requiredString,
});

export default {
    CREATE,
    LOGIN,
};
