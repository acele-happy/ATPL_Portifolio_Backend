import './models/mongodb.js'
import express from "express"
const {json, urlencoded} = express
const app= express()
import routes from './routes/routes.js'
import cors from "cors"
import dotenv from 'dotenv'

//Swagger
import swaggerJsDoc from 'swagger-jsdoc'
import {serve, setup} from 'swagger-ui-express'
const swaggerOptions={
  swaggerDefinition:{
    info:{
      title:"My brand backend API",
      description: "Backend API for ATPL Portifolio",
      contact:{
        name: "Acele Happy"
      },
      servers:["http://localhost:3000"]
    }
  },
  apis:["./routes/routes.js"]
}

dotenv.config()
const swaggerDocs = swaggerJsDoc(swaggerOptions)
const PORT = process.env.PORT
app.use(json())
app.use(urlencoded({extended:true}))
app.use(routes)
app.use(cors())
app.use("/documentations",serve, setup(swaggerDocs))


const server = app.listen(PORT,()=>console.log("running on port "+ PORT))

export default server;