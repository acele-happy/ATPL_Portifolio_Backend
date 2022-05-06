import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://portifolio-backeend:portifolio-backeend@cluster0.0ttlg.mongodb.net/portifolio-backeend?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("connected to db !!")
})
.catch((ex)=>{
    console.log("failed to connect to db "+ex)
})