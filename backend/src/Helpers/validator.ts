import Joi  from "joi";

export  const UserSchema=Joi.object({
    username:Joi.string().required().min(5),
    email:Joi.string().required().email(),
    password:Joi.string().required().min(6),
})


export  const loginSchemas=Joi.object({
    
    email:Joi.string().required().email(),
    password:Joi.string().required().min(6),
})