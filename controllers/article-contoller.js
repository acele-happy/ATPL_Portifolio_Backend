import {Article} from '../models/Article.js'

export const createArticle = async (req,res)=>{
   try{
    let pic = req.Picture
    let content = req.Content

    let article = new Article({
        pic,
        content
    })

    await article.save()
    return res.status(201).send("Article created!!") 
   }catch(ex){
        res.status(500).send(ex.message);
   }
}