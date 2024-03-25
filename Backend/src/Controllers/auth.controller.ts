import { NextFunction, Request, Response } from "express";
import Connection from "../dbHelpers/dbHelper";
import { loginUserValidation } from "../Validators/user.validator";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import { extendeUserRequest } from "../Middlewares/verifyToken";





const dbHelper = new Connection

export const loginUser = async(req:Request, res:Response)=>{
    try {

        const{email, password} = req.body

        console.log(req.body);
        

        let{error} = loginUserValidation.validate(req.body)
        console.log(error);
        

        if(error){           
            
            return res.json({
                error:error.details[0].message
            })
        }

        let user = (await dbHelper.execute('login', {
            email
        })).recordset
        console.log(user);

        console.log(user[0]?.email);        

        if(user[0]?.email == email){
            
            const correct_pwd = await bcrypt.compare(password, user[0].password)
            console.log(user[0].password);
            
            if(!correct_pwd){
                return res.json({
                    error: "Incorrect password"
                })
            }else{
                
                const loginCredentials = user.map((response:any)=>{
                    const{registerDate, isDeleted, isWelcomed, password, ...rest } = response
                    console.log(response);
                    

                    return rest
                })

                console.log(process.env.SECRET);
                

                const token = jwt.sign(loginCredentials[0], process.env['SECRET'] as string,
                {
                    expiresIn:'3d'
                }
                )
                console.log(token);
                

                return res.json({
                    message:'Login Success',
                    token
                })
            }
        }else{
            return res.json({
                error: 'User not found'
            })
        }
        
    } catch (error) {
        return res.json({
            error:error
        })        
    }
}


export const checkUserDetails = async(req:extendeUserRequest, res:Response, next:NextFunction)=>{
    if(req.info){
        console.log(req.info);       
        
        
        return res.json({
            info:req.info
        })

    }

}


export const authorize = (...role:string[])=>{
    return async(req:extendeUserRequest, res:Response, next:NextFunction)=>{
        if(req.info){
            // console.log(req);
            
            console.log(req.info.role);
            
            
            if(!role.includes(req.info.role)){
                console.log('No permission');
                

                return res.json({
                    error:'You do not have permission to perform this action',
                }

                )
            }
            console.log('Permission granted');
            
            
            next()

        }


    }
}

