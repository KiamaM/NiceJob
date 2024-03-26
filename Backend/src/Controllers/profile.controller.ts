import { Request, Response } from 'express';
import Connection from '../dbHelpers/dbHelper';
import { v4 } from 'uuid';
import { profile } from '../Interfaces/profile.interface';


const dbhelper = new Connection

export const scheduleAppointment = async(req:Request, res:Response)=>{
    try {
        const id = v4()
        console.log(id);


        const{userId,listingId, appointmentDate}:profile = req.body

        
               

        let result = await dbhelper.execute('scheduleAppointment', {
            profileId:id,userId, listingId, appointmentDate
        })
        
        if(result.rowsAffected[0] < 1){
            return res.json({
                error:'Error when scheduling appointment'
            })
        }else 
            return res.json({
                message:'You have successfully scheduled an appointment'
            })




    } catch (error:any) {
        return res.json({
            
            error:error.originalError.info.message
        })
    }
}






export const getAllProfiles = async(req:Request, res:Response)=>{
    try {

        let profiles = (await dbhelper.execute('getAllProfiles')).recordset

        return res.json({
            profiles:profiles
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}


export const getProfilesBySpecialist = async(req:Request, res:Response)=>{
    try {

        const id = req.params.id


        let profile = (await dbhelper.execute('getProfilesBySpecialist', {userId:id})).recordset

        return res.json({
            profile:profile
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}








export const getOneProfile = async(req:Request, res:Response)=>{
    try {

        const id = req.params.id


        let profile = (await dbhelper.execute('getOneProfiles', {userId:id})).recordset

        return res.json({
            profile:profile
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}

export const deleteProfile = async(req:Request, res:Response)=>{

    try {
        const id = req.params.id

        const result = (await dbhelper.execute('deleteProfile', {userId:id})).rowsAffected

        return res.json({
            message:'Profile deleted successfully'
        })
        
    } catch (error:any) {

        return res.json({
            error:error.originalError.message
        })
        
    }



}



export const cancelAppointment = async(req:Request, res:Response)=>{

    try {
        const id = req.params.id

        const result = (await dbhelper.execute('cancelAppointment', {profileId:id})).rowsAffected

        return res.json({
            message:'Appointment cancelled successfully'
        })
        
    } catch (error:any) {

        return res.json({
            error:error.originalError.message
        })
        
    }



}


export const reschedule = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id

        const{appointmentDate}= req.body

        const result = (await dbhelper.execute('reschedule', {
            profileId:id, appointmentDate
        })).rowsAffected


        console.log(result);
        

        return res.json({
            message:"You rescheduled successfully"
        })
        


        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
}


export const getAppointments = async(req:Request, res:Response)=>{
    try {

        const id = req.params.id

        let appointments = (await dbhelper.execute('getAppointments', {userId:id})).recordset

        console.log(appointments);

        return res.json({
            appointments
        })
        
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
}








export const getOneAppointment = async(req:Request, res:Response)=>{
    try {

        const id = req.params.id


        let appointment = (await dbhelper.execute('getOneAppointment', {profileId:id})).recordset

        return res.json({
            appointment:appointment
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}










