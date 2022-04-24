import express from 'express'
const router = express.Router()
import {createArticle, getAllArticles, getArticleById, deleteArticle,updateArticle} from '../controllers/article-contoller.js'

import {signup,getAllUsers,getUserById} from '../controllers/user-controller.js'

router.post('/createArticle',createArticle)
router.get('/getAllArticles',getAllArticles)
router.get('/getArticleById/:id',getArticleById)
router.delete('/deleteArticle/:id',deleteArticle)
router.put('/editArticle',updateArticle)
router.post('/signup',signup)
router.get('/getAllUsers',getAllUsers)
router.get('/getUserById/:id',getUserById)

export default router