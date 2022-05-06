const jwt =require('jsonwebtoken')
const {verify} = jwt

module.exports= function(req,res,next){
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).send("Access Denied! Login first")
    }
    try{
        const tokenArray = token.split(" ");
        let user = verify(tokenArray[1],(process.env.JWT_SECRET))
        next()
    }catch(e){
        res.status(400).send("Invalid token")
    }

}