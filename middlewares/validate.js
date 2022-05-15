const Joi =require('joi')
const _ =require("lodash")

module.exports.validateCreateUser = async(req,res,next)=>{
    try{
        const schema = Joi.object({
            Name: Joi.string().min(3).max(70).required().label("Name"),
            Email: Joi.string().min(5).required().label("Email"),
            Password: Joi.string().min(5).required().label("Password") 
        })
        const {error} = schema.validate(req.body)
        if(error){
            return res.render('signup.ejs',{message: error.message,style:'error-div'})}
            return next()
    }catch(e){
        res.render('signup.ejs',{message:"Error!!",style:'error-div'})
    }
}

module.exports.validateLoginAsUser = async(req,res,next)=>{
    try{
        const schema = Joi.object({
            Email: Joi.string().min(5).required().label("Email"),
            Password: Joi.string().min(5).required().label("Password")
        })

        const {error} = schema.validate(req.body)
        if(error){
            return res.render('loginAsUser.ejs',{message:error.message,style:"error-div"})
        }

        return next()
    }catch(e){
        res.status(400).send("Error!")
    }
}

module.exports.validateLoginAsAdmin = async(req,res,next)=>{
    try{
        const schema = Joi.object({
            Email: Joi.string().min(5).required().label("Email"),
            Password: Joi.string().min(5).required().label("Password")
        })

        const {error} = schema.validate(req.body)
        if(error){
            return res.render('login.ejs',{message:error.message,style:"error-div"})
        }

        return next()
    }catch(e){
        res.status(400).send("Error!")
    }
}

//Article

module.exports.validateCreatenUpdateArticle = (req,res,next)=>{
    const schema = Joi.object({
        Picture: Joi.string().required().label("Picture"),
        Title: Joi.string().required().label("Title"),
        Content: Joi.string().min(50).required().label("Content")
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.render('newBlog.ejs',{message: error.message})
        // return res.status(400).json({
        //     error: error.message,
        //     message: "Unable to login to your account"
        // })
    }

    return next()
}

module.exports.validateContact = (req,res,next)=>{
    try{
        const schema = Joi.object({
            Name: Joi.string().required().label("Name"),
            Email: Joi.string().required().label("Email"),
            Message: Joi.string().min(5).required().label("Message")
        })

        const {error} = schema.validate(req.body)
        if(error){
              return res.status(400).json({
            error: error.message,
            message: "Thank you for your message!!"
        })
        }
        return next()
    }catch(ex){
        res.send(ex.message)
    }
}

module.exports.validateComment = (req,res,next)=>{
    try{
        const schema = Joi.object({
            Name: Joi.string().required().label("Name"),
            Message: Joi.string().min(5).required().label("Message")
        })

        const {error} = schema.validate(req.body)
        if(error){
              return res.status(400).json({
            error: error.message,
            message: "Thank you for your message!!"
        })
        }
        return next()
    }catch(ex){
        res.send(ex.message)
    }
}