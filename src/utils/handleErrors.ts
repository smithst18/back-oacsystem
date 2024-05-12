import { Response } from "express";
/**
 * Wait for 3  elements express ress, response code and message
 * @param {*} res 
 * @param {*} code 
 * @param {*} msg 
 */
export const handleError = ( res : Response, code :number = 500, msg :String = "an error has ocurred" ) =>{
    res.status(code).send({
        code,
        message: msg
    });
}