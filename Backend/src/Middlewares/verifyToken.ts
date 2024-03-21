import { NextFunction, Request, Response } from "express";
import { loginUserDetails } from "../Interfaces/users.interface";
import jwt from 'jsonwebtoken';


export interface extendeUserRequest extends Request{
    info?:loginUserDetails
}


export const verifyToken =async(req:extendeUserRequest, res:Response, next:NextFunction)=>{

    try {

        const token = req.headers['token'] as string

        if(!token){
            res.json({
                error: 'You do not have access'
            })
        }
        const data = jwt.verify(token, process.env.SECRET as string) as loginUserDetails
    
        req.info = data    
        console.log(data);
        
        
    } catch (error) {
        res.json({
            error:error
        })
    }


    next()

}


