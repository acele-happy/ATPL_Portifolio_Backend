import {Article} from '../models/Article.js'

export const createArticle = async (req,res)=>{
   try{
    let pic = req.body.Picture
    let title = req.body.Title
    let content = req.body.Content
    // console.log("my piccc "+pic)
    let article = new Article({
        Picture: pic,
        Title: title,
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
        const result = await Article.findById(req.params.id)
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
        console.log("params "+id)
        if(id==undefined){
            return res.status(400).send("Undefined id")
        }
        let result = await Article.findByIdAndDelete(id)
        return res.status(200).send({
            message: "deleted!!",
            data: result
        })
    }catch(ex){
        // console.log("eroorrr")
        res.status(500).send(ex.message);
    }
}

export const updateArticle = async(req,res)=>{
    try{
        const  pic = req.body.Picture
        const title= req.body.Title
        const  content = req.body.Content
        let  article = await Article.findById(req.params.id)

        article.Picture = pic;
        article.Title = title
        article.Content = content
        await article.save()
        return res.status(200).send("Article updated!!"+ article)
    }catch(err){
        res.status(500).send(err.message);

    }
}


export const addComment= async(req,res)=>{
   try{
    // let commenter = req.User._id
    // console.log(req.body.user._id)
    let content= req.body.content
    let articleId= req.params.id


    let comment={
        content: content,
        date: Date.now()
    }

    let article= await Article.findById(articleId)
    if(!article){
        return res.status(404).send("Article no found!!")
    }
    article.Comments.push(comment)
    article.save()
    return res.json({message: "comment added successfully", status: 201, data: article})
   }catch(e){
    console.log(e);
        return res.json({message: "An error occured, try again", status: 500})
   }
}

export const likeUnlikeArticle = async(req,res)=>{
    try{
        let articleId= req.params.id
        let userId = req.User._id

        let article = Article.findById(articleId)
        if(!article){
            return res.json({message: "The property with the given id was not found", status: 400})
        }


    }catch(e){
        return res.json({message: "An error occured, try again", status: 500})
    }
}
