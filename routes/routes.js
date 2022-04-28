import express from 'express'
const router = express.Router()
import {createArticle, getAllArticles, getArticleById, deleteArticle,updateArticle,addComment} from '../controllers/article-contoller.js'

import {signup,getAllUsers,getUserById,loginAsAdmin,loginAsUser} from '../controllers/user-controller.js'
import {validateCreateUser,validateLogin,validateCreatenUpdateArticle} from '../middlewares/validate.js'
import authenticate from '../middlewares/auth.js'

router.post('/createArticle',authenticate, validateCreatenUpdateArticle,createArticle)
router.patch('/comment/:id',authenticate,addComment)
router.get('/getAllArticles',getAllArticles)
router.get('/getArticleById/:id',getArticleById)
router.delete('/deleteArticle/:id',authenticate,deleteArticle)
router.put('/editArticle/:id',authenticate,validateCreatenUpdateArticle,updateArticle)

//User Routers
router.post('/signup',validateCreateUser,signup)
router.get('/getAllUsers',authenticate,getAllUsers)
router.get('/getUserById/:id',getUserById)
router.post('/loginAsAdmin',validateLogin,loginAsAdmin)
router.post('/loginAsUser',validateLogin,loginAsUser)

export default router