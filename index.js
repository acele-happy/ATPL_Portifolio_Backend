require('./models/mongodb.js')
const express = require("express")
const {json, urlencoded} = express
const app= express()
const routes = require( './routes/routes.js')
const cors = require("cors")
const dotenv = require('dotenv')
const lodash =require( 'lodash')
const {pick} = lodash
const authenticate = require('./middlewares/auth')
//validations
const {validateCreateUser} = require('./middlewares/validate')
const {corsFunction} = require('./utils/cors')
//Swagger
const swaggerUi = require('swagger-ui-express')

//to use require in es6 you need to import it!
const swaggerDocument = require('./swagger.json')
dotenv.config()
const PORT = process.env.PORT

app.set('view engine', 'ejs')

app.use(json())
app.use(urlencoded({extended:true}))
app.use(express.static('views'))
app.use(routes)
app.use(cors())
app.use(corsFunction) 
app.use('/documentation',swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.static('client/build'))
const path =require('path')
const User = require('./models/User.js')
const { signup } = require('./controllers/user-controller.js')
app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.get('/loginAsAdmin',(req,res)=>{
    res.render('login.ejs',{message:"",style:""})
})
app.get('/signup',(req,res)=>{
    res.render('signup.ejs',{message:"",style:""})
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views','contact.html'))
})
app.get('/loginAsUser',(req,res)=>{
    res.render('loginAsUser.ejs',{message:"",style:""})
})
app.get('/newBlog',(req,res)=>{
    res.render('newBlog.ejs',{message:""})
})
app.get('/dashboard',(req,res)=>{
    res.render('dashboard.ejs')
})
app.get('/singleBlog',(req,res)=>{
    res.render('singleBlog.ejs')
})
app.get('/getAllArticles',(req,res)=>{
    res.render('viewAllArticles.ejs')
})

const server = app.listen(PORT,()=>console.log("running on port "+ PORT))

module.exports=  server;