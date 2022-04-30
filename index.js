import './models/mongodb.js'
import express from "express"
const {json, urlencoded} = express
const app= express()
import routes from './routes/routes.js'
import cors from "cors"
import dotenv from 'dotenv'

//Swagger
import swaggerUi from 'swagger-ui-express'

//to use require in es6 you need to import it!
import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const swaggerDocument = require('./swagger.json')

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()
const PORT = process.env.PORT
app.use(json())
app.use(urlencoded({extended:true}))
app.use(express.static('views'))
app.use(routes)
app.use(cors())
app.use('/documentation',swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.static('client/build'))
import path from 'path'
app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views','index.html'))
})
app.get('/login',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views','login.html'))
})
app.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views','contact.html'))
})
app.get('/loginAsUser',(req,res)=>{
    res.render('loginAsUser.ejs')
})

const server = app.listen(PORT,()=>console.log("running on port "+ PORT))

export default server;