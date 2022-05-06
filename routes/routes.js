const express =require( 'express')
const router = express.Router()
const {createArticle, getAllArticles, getArticleById, deleteArticle,updateArticle,addComment} =require( '../controllers/article-contoller.js')

 const {signup,getAllUsers,getUserById,loginAsAdmin,loginAsUser,deleteUser} =require( '../controllers/user-controller.js')
const {validateCreateUser,validateLogin,validateCreatenUpdateArticle} =require( '../middlewares/validate.js')
const authenticate =require( '../middlewares/auth.js')

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
router.delete('/deleteUser/:id',authenticate,deleteUser)

module.exports= router