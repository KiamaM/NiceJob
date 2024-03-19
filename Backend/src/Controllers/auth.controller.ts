import { Request, Response } from "express";
import Connection from "../dbHelpers/dbHelper";
import { loginUserValidation } from "../Validators/user.validator";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import { extendeUserRequest } from "../Middlewares/verifyToken";





const dbHelper = new Connection

export const loginUser = async(req:Request, res:Response)=>{
    try {

        const{email, password} = req.body

        // console.log(req.body);
        

        let{error} = loginUserValidation.validate(req.body)
        console.log(error);
        

        if(error){           
            
            return res.json({
                error:error.details[0].message
            })
        }

        let user:any = (await dbHelper.execute('login', {
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
                console.log('Hi');
                
                const loginCredentials = user.map((response:any)=>{
                    const{firstName, lastName, role, password,isDeleted, ...rest } = response
                    console.log(response);
                    

                    return rest
                })

                console.log(process.env.SECRET);
                

                const token = jwt.sign(loginCredentials[0], process.env['SECRET'] as string,
                {
                    expiresIn:'3600s'
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


export const checkUserDetails = async(req:extendeUserRequest, res:Response)=>{
    if(req.info){
        return res.json({
            info:req.info
        })
    }
}

