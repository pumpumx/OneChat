import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination :  function(req , cb){
        cb(null , path.resolve('public/temp/'))
    },
    filename : function (req , file , cb){
        console.log("multer fileName" , file.fieldname)
        cb(null , file.fieldname)
    },
})

export const upload = multer({storage})