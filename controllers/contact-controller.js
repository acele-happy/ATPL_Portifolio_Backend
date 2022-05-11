const Contact = require('../models/Contact')

module.exports.createContactMessage = async(req,res)=>{
    try{
        let name = req.body.Name
        let message = req.body.Message

        let newMessage = await new Contact({
            Name: name,
            Message: message
        })
        await newMessage.save()
        return res.render('contact.ejs',{message:"Thank you, we will be in touch!!",style:"success"}).status(201)

    }catch(ex){
        res.render('contact.ejs').status(400).send(ex)
    }
}