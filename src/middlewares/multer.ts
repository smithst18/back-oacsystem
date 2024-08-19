import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { extname } from 'path';
import { handleError } from '../utils/handleErrors';

const mimetypes = ["file/xlsx"];

//interfaces 
interface FileNameCallback {
  (error: Error | null, filename: string): void;
}
interface DestinationCallback {
  (error: Error | null, destination: string): void;
}

//configuracion del storage de multer
const storage = multer.diskStorage({
  destination: function (request: Request, file: Express.Multer.File, cb: DestinationCallback) {
    const pathStorage = `${__dirname}/../public/images`;
    cb(null, pathStorage);
  },

  filename: function ( req: Request, file: Express.Multer.File, cb: FileNameCallback) {
    const userId = req.body.id;

    const extension = extname(file.originalname);

    const fileName = `profilePic-${userId}${extension}`;

    cb(null, fileName);
  }
});

//esta constate contiene las funciones para leer archivos
// export const upload = multer(); // no utilizado de momento
//esta constate contiene las funciones de multer y el storage para guardar de manera local
export const uploadFile = multer({
  storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (mimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }, 
  limits:{
    fileSize: 5000000,  
  },
});

export const multerErrorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
  // err.stack
  if(err instanceof multer.MulterError) handleError(res,403,'tamaño de archivo permitido excedido');
  next();
}
