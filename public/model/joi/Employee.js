const Joi = require('joi');
const errMessages = (errors) =>{
    errors.forEach(err =>{
        switch (err.code) {

            case "string.min":
                err.message = "pole musi zawierać co najmniej 4 znaki";
                break;
            case "string.max":
                err.message = "pole musi zawierać co najwyżej 60 znaków";
                break;
            case "string.email":
                err.message = "email jest niepoprawny";
                break;
            case "string.empty":
                err.message = "pole jest wymagane";
                break;
            default:
                break;
        }
    });
    return errors
}

const empSchema = Joi.object({
    _id:Joi.number().optional().allow(""),
    Imie:Joi.string().min(4).max(60).required().error(errMessages),
    Nazwisko:Joi.string().min(4).max(60).required().error(errMessages),
    email:Joi.string().email().required().error(errMessages)
});



module.exports = empSchema;

