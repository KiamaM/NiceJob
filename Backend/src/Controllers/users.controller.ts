import { Request, Response } from "express";
import { createdUser, updatedUser,  } from "../Interfaces/users.interface";
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




//  CLIENT CONTROLLERS




export const getAllClients = async(req:Request, res:Response)=>{
    try {

        let clients = (await dbhelper.execute('getAllClients')).recordset

        return res.json({
            clients:clients
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}

export const getOneClient = async(req:Request, res:Response)=>{
    try {

        const id = req.params.id

        let user = (await dbhelper.execute('getOneClient', {userId:id})).recordset

        console.log(user);

        return res.json({
            user
        })
        
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
}

export const deleteClient = async(req:Request, res:Response)=>{

    try {
        const id = req.params.id

        const result = (await dbhelper.execute('deleteClient', {userId:id})).rowsAffected

        return res.json({
            message:'Account deactivated successfully'
        })
        
    } catch (error:any) {

        return res.json({
            error:error.originalError.message
        })
        
    }



}


export const updateClient = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id

        const{firstName, lastName, role, email}:updatedUser= req.body

        const result = (await dbhelper.execute('updateClient', {
            userId:id, 
            firstName:firstName,
            lastName:lastName,
            email:email
        })).rowsAffected


        console.log(result);
        

        return res.json({
            message:"Profile updated successfully"
        })
        


        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
}






//    SPECIALIST CONTROLLERS


export const getAllSpecialists = async(req:Request, res:Response)=>{
    try {

        let specialists = (await dbhelper.execute('getAllSpecialists')).recordset

        return res.json({
            specialists:specialists
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}

export const getOneSpecialist = async(req:Request, res:Response)=>{
    try {

        const id = req.params.id

        let specialist = (await dbhelper.execute('getOneSpecialist', {userId:id})).recordset

        console.log(specialist);

        return res.json({
            specialist
        })
        
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
}

export const deleteSpecialist = async(req:Request, res:Response)=>{

    try {
        const id = req.params.id

        const result = (await dbhelper.execute('deleteSpecialist', {userId:id})).rowsAffected

        return res.json({
            message:'Account deactivated successfully'
        })
        
    } catch (error:any) {

        return res.json({
            error:error.originalError.message
        })
        
    }



}

export const updateSpecialist = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id

        const{firstName, lastName, role, email}:updatedUser= req.body

        const result = (await dbhelper.execute('updateSpecialist', {
            userId:id, 
            firstName:firstName,
            lastName:lastName,
            email:email
        })).rowsAffected


        console.log(result);
        

        return res.json({
            message:"Profile updated successfully"
        })
        


        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
}


