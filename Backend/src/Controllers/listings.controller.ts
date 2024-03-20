import { Request, Response } from 'express';
import Connection from '../dbHelpers/dbHelper';
import { v4 } from 'uuid';
import { newListing, updatedListing } from '../Interfaces/listings.interface';


const dbhelper = new Connection

export const createListing = async(req:Request, res:Response)=>{
    try {
        const id = v4()
        console.log(id);

        const{serviceName,serviceDescription, serviceCategory, location, rates, openTime, closeTime, experience, serviceImage}:newListing = req.body
        

        let result = await dbhelper.execute('createListing', {
            serviceId:id, serviceName,serviceDescription, serviceCategory, location, rates, openTime, closeTime, experience, serviceImage
        })
        
        if(result.rowsAffected[0] < 1){
            return res.json({
                error:'Unable to create new listing'
            })
        }else 
            return res.json({
                message:'Listing created successfully'
            })




    } catch (error:any) {
        return res.json({
            
            error:error.originalError.info.message
        })
    }
}




//  PRODUCT CONTROLLERS




export const getAllListings = async(req:Request, res:Response)=>{
    try {

        let listings = (await dbhelper.execute('getALLLIstings')).recordset

        return res.json({
            listings:listings
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}

export const getOneListing = async(req:Request, res:Response)=>{
    try {

        const id = req.params.id

        let listing = (await dbhelper.execute('getOneListing', {serviceId:id})).recordset

        console.log(listing);

        return res.json({
            listing
        })
        
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
}

export const deleteListing = async(req:Request, res:Response)=>{

    try {
        const id = req.params.id

        const result = (await dbhelper.execute('deleteListing', {serviceId:id})).rowsAffected

        return res.json({
            message:'Listing deleted successfully'
        })
        
    } catch (error:any) {

        return res.json({
            error:error.originalError.message
        })
        
    }



}


export const updateListing = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id

        const{serviceName,serviceDescription, serviceCategory, location, rates, openTime, closeTime, experience, serviceImage}:updatedListing= req.body

        const result = (await dbhelper.execute('updateListing', {
            serviceId:id, serviceName,serviceDescription, serviceCategory, location, rates, openTime, closeTime, experience, serviceImage
        })).rowsAffected


        console.log(result);
        

        return res.json({
            message:"Listing updated successfully"
        })
        


        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
}






