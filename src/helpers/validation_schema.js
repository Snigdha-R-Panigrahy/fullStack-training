const joi = require('joi');
const authSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    passwrod: joi.string().min(8).required(),
});

module.exports = {
    authSchema
};
