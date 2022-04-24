import './models/mongodb.js'
import express from "express"
const {json, urlencoded} = express
const app= express()
const PORT = 4040
import routes from './routes/routes.js'
import cors from "cors"

import { readFile } from 'fs/promises';
const swaggerJson = JSON.parse(
  await readFile(
    new URL('./swagger.json', import.meta.url)
  )
);

import {swaggerUi } from "./utils/swagger.js";

app.use(json())
app.use(urlencoded({extended:true}))
app.use(routes)
app.use(cors())
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJson));


app.listen(PORT,()=>console.log("running on port 4040.."))