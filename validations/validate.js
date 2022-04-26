import Joi from 'joi'
import _ from "lodash"

export const validateCreateUser = async(req,res,next)=>{
    try{
        const schema = Joi.object({
            Name: Joi.string().min(3).max(70).required().label("Name"),
            Email: Joi.string().min(5).required().label("Email"),
            Password: Joi.string().min(5).required().label("Password") 
        })
        const {error} = schema.validate(req.body)
        if(error){
            return res.status(400).json({
                error: error.message,
                message: "Unable to create the account."
            })
            }
            return next()
    }catch(e){
        res.status(400).send("Error!! "+e)
    }
}

export const validateLogin = async(req,res,next)=>{
    try{
        const schema = Joi.object({
            Email: Joi.string().min(5).required().label("Email"),
            Password: Joi.string().min(5).required().label("Password")
        })

        const {error} = schema.validate(req.body)
        if(error){
            return res.status(400).json({
                error: error.message,
                message: "Unable to login to your account"
            })
        }

        return next()
    }catch(e){
        res.status(400).send("Error!")
    }
}
//Article

export const validateCreatenUpdateArticle = (req,res,next)=>{
    const schema = Joi.object({
        Picture: Joi.string().required().label("Picture"),
        Content: Joi.string().min(50).required().label("Content")
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            error: error.message,
            message: "Unable to login to your account"
        })
    }

    return next()
}

