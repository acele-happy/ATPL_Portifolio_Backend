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


dotenv.config()
const PORT = process.env.PORT
app.use(json())
app.use(urlencoded({extended:true}))
app.use(routes)
app.use(cors())
app.use('/documentation',swaggerUi.serve, swaggerUi.setup(swaggerDocument))


const server = app.listen(PORT,()=>console.log("running on port "+ PORT))

export default server;