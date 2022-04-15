import './models/mongodb.js'
import express from "express"
const {json, urlencoded} = express
const app= express()
const PORT = 4040
import routes from './routes/article-routes.js'
import cors from "cors"

app.use(json())
app.use(urlencoded({extended:true}))
app.use(routes)
app.use(cors())


app.listen(PORT,()=>console.log("running on port 4040.."))