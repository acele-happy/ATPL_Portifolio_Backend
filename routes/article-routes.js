import express from 'express'
const router = express.Router()
import {createArticle, getAllArticles, getArticleById, deleteArticle,updateArticle} from '../controllers/article-contoller.js'

router.post('/createArticle',createArticle)
router.get('/getAllArticles',getAllArticles)
router.get('/getArticleById/:id',getArticleById)
router.delete('/deleteArticle/:id',deleteArticle)
router.put('/editArticle',updateArticle)

export default router