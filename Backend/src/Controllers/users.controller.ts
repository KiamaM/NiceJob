import { Request, Response } from "express";
import { createdUser } from "../Interfaces/users.interface";
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import Connection from "../dbHelpers/dbHelper";
import { registerUserValidation } from "../Validators/user.validator";

const dbhelper = new Connection

export const registerUser = async(req:Request, res:Response)=>{
    try {
        const id = v4()
        console.log(id);

        const{firstName, lastName, role, email, password}:createdUser = req.body

        let{error} = registerUserValidation.validate(req.body)     
        
        if(error){
            return res.json({
                error:error.details[0].message
            })
        }

        const hashedPwd = await bcrypt.hash(password, 5)
        console.log(hashedPwd);


        let result = await dbhelper.execute('registerUser', {
            userId:id, firstName, lastName, role, email, hashedPwd
        })
        
        if(result.rowsAffected[0] < 1){
            return res.json({
                error:'Account creation failed'
            })
        }else 
            return res.json({
                message:'Account created successfully'
            })




    } catch (error:any) {
        return res.json({
            
            error:error.originalError.info.message
        })
    }
}


