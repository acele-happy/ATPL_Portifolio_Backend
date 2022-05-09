const multer = require('multer')
const {diskStorage} = require('multer')

const uploadFile = (destination)=>{
    const storage = diskStorage({})

    const fileFilter = (req,file,cb)=>{
        if(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png'){
            cb(null,true)
        }else{
            cb("File type not supported",false)
        }
    }

    const upload = multer({
        storage: storage,
        limits:{
            fileSize:1024*1024*4
        },
        fileFilter:fileFilter
    })
    return upload
}