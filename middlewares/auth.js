import jwt from 'jsonwebtoken'
const {verify} = jwt

export default function(req,res,next){
   console.log("auth entered!!")
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).send("Access Denied! Login first")
    }
    try{
        const tokenArray = token.split(" ");
        let user = verify(tokenArray[1],("happy_secret_key"))
        next()
    }catch(e){
        res.status(400).send("Invalid token")
    }

}