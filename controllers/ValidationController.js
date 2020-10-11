const Joi = require('@hapi/joi');
const { string } = require('@hapi/joi');


const registerValidation = data => {
    const schema = Joi.object({
        firstname : Joi.string().required(),
        lastname : Joi.string().required(),
        username : Joi.string().required(),
        password : Joi.string().min(6).required(),
        email : Joi.string().min(6).required(),
        college : Joi.string().required(),
        role : Joi.string()
    });
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        username : Joi.string().required(),
        password : Joi.string().required()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;