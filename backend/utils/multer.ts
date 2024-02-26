import multer from 'multer'
import {v4 as uuidv4} from 'uuid'

// const storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, 'uploads')
//     },
//     filename: function(req, file, callback){
//         callback(null, uuidv4() + '-' + Date.now() + file.originalname)
//     }
// })

const storage = multer.memoryStorage()

const fileFilter = (req: any, file: { mimetype: string }, callback: (arg0: null, arg1: boolean) => void) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if(allowedTypes.includes(file.mimetype)) {
        callback(null, true)
    }else(
        callback(null, false)
    )
}

const fileSizeFormatter = (bytes: number, decimal: number) => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
      parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
    );
};

const photoMiddleware = multer({storage, fileFilter})

export {photoMiddleware, fileSizeFormatter}