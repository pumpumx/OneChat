import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination :  function(req ,file, cb){
        cb(null , path.resolve('public/temp/'))
    },
    filename : function (req , file , cb){
        console.log("multer fileName" , file.originalname)
        cb(null , file.originalname)
    },
})

export const upload = multer({storage})