import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { extname } from 'path';
import { handleError } from '../utils/handleErrors';
import { generateUniqueId } from '../utils/handleRandomId';

const mimetypes = ["application/pdf"];
const pathStorage = `${__dirname}/../public/files`;

//interfaces 
interface FileNameCallback {
  (error: Error | null, filename: string): void;
};

interface DestinationCallback {
  (error: Error | null, destination: string): void;
};

//configuracion del storage de multer
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
    cb(null, pathStorage);
  },

  filename: function ( req: Request, file: Express.Multer.File, cb: FileNameCallback) {

    const extension = extname(file.originalname);

    const fileName = `informacion-caso-${generateUniqueId()}${extension}`;

    req.body.fileName = fileName;

    cb(null, fileName);
  }
});

//esta logica se ejecuta antes del storage y el filefilter sirve para validar tipo de  archivos y etc la logica debe ir en filename 
export const uploadFile = multer({
  storage,
  //este es un filtro en este momento no deberia existir el archivo
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (mimetypes.includes(file.mimetype)) {
      cb(null, true);  // Si es PDF, permitir que continúe la carga.
    } else {
      cb(new Error('Debe ser un pdf'));  // Si no es PDF, rechaza.
    }
  },
  limits:{
    fileSize: 50000000,
  },
});

//esta middleware debe ser llamado en cada routa donde se use multer para procesar los errores

export const multerErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    return handleError(res, 403, 'Tamaño de archivo permitido excedido 50 mb');
  } else if (err) {
    // Aquí manejará el error personalizado de "Debe ser un pdf"
    return res.status(400).send({ msg: err.message });
  }
  next();
}
