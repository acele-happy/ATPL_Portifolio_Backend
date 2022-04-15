import {Article} from '../models/Article.js'

export const createArticle = async (req,res)=>{
   try{
    let pic = req.body.Picture
    let content = req.body.Content
    // console.log("my piccc "+pic)
    let article = new Article({
        Picture: pic,
        Content: content
    })

    await article.save()
    return res.status(201).send("Article created!!") 
   }catch(ex){
        res.status(500).send(ex.message);
   }
}

export const getAllArticles = async (req,res)=>{
    try{
        const result = await Article.find()
        if(result.length == 0){
            return res.status(200).send("No article yet!")
        }
        return res.status(200).send(result)
    }catch(ex){
        console.log("error")
       return res.status(500).send(ex.message);
    }
}

export const getArticleById = async(req,res)=>{
    try{
        console.log("paramssss "+req.params.id)
        const result = await Article.findById(req.params._id)
        if(!result){
            res.send("Invalid article id !").status(400)
        }
        return res.status(200).send(result)
    }catch(ex){
        res.status(500).send(ex.message);
    }
}

export const deleteArticle= async (req,res)=>{
    try{
        let id= req.params.id
        if(id==undefined){
            return res.status(400).send("Undefined id")
        }
        let result = await Article.findByIdAndDelete(id)
        return res.status(200).send("Article deleted!!")
    }catch(ex){
        res.status(500).send(ex.message);
    }
}

export const updateArticle = async(req,res)=>{
    try{
        let id= req.params.id
        if(id==undefined){
            return res.status(400).send("Undefined id")
        }
        const  pic = req.Picture
        const  content = req.Content
        let  article = await Article.findById(id)

        article.Picture = pic;
        article.Content = content
        await article.save()
        return res.status(200).send("Article created!!"+ article)
    }catch(err){
        res.status(500).send(err.message);

    }
}

