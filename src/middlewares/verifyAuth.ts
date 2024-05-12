import { Request, Response, NextFunction } from "express";
import { handleError } from "../utils/handleErrors";
import { verifyToken } from "../utils/handleJWT";



/**
 * Middleware for active sesion
 * @param req The HTTP request object
 * @param res The HTTP response object
 * @param next The function to pass control to the next middleware
 */
export const sesionAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        
      const headerAuth = req.headers.authorization; // Use optional chaining
  
      if (!headerAuth) return handleError(res, 401, 'Header is missing');
  
      const token = headerAuth.split(' ').pop()!.trim();
      const authenticated = verifyToken(token);
  
      if (authenticated) {
        req.user = authenticated;
        next();
      } else {
        handleError(res, 419, 'Invalid_Token');
      }
    } catch (e) {
      console.error(e);
      handleError(res, 403, 'Sesion_Auth_Error');
    }
  };