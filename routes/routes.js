const express =require( 'express')
const router = express.Router()
const {createArticle, getAllArticles, getArticleById, deleteArticle,updateArticle,addComment,dashboard} =require( '../controllers/article-contoller.js')

 const {signup,getAllUsers,getUserById,loginAsAdmin,loginAsUser,deleteUser} =require( '../controllers/user-controller.js')
const {validateCreateUser,validateLoginAsAdmin,validateCreatenUpdateArticle,validateContact,validateLoginAsUser} =require( '../middlewares/validate.js')
const {createContactMessage} = require('../controllers/contact-controller')
const authenticate =require( '../middlewares/auth.js')
const upload = require('../utils/multer')

router.post('/createArticle',upload.single('Picture'),createArticle)
router.patch('/comment/:id',authenticate,addComment)
router.get('/getAllArticles',getAllArticles)
router.get('/dashboard',dashboard)
router.get('/getArticleById/:id',getArticleById)
router.delete('/deleteArticle/:id',deleteArticle)
router.put('/editArticle/:id',authenticate,validateCreatenUpdateArticle,updateArticle)

//User Routes
router.post('/signup',validateCreateUser,signup)
router.get('/getAllUsers',authenticate,getAllUsers)
router.get('/getUserById/:id',getUserById)
router.post('/loginAsAdmin',validateLoginAsAdmin,loginAsAdmin)
router.post('/loginAsUser',validateLoginAsUser,loginAsUser)
router.delete('/deleteUser/:id',authenticate,deleteUser)

// Message Routes
router.post('/createContactMessage',validateContact,createContactMessage)

module.exports= router