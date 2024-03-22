import { Request, Response } from 'express';
import Connection from '../dbHelpers/dbHelper';
import { v4 } from 'uuid';
import { reviews } from '../Interfaces/reviews.interface';


const dbhelper = new Connection

export const addReview = async(req:Request, res:Response)=>{
    try {
        const id = v4()
        console.log(id);


        const{userId,profileId, review, rating}:reviews = req.body

        
               

        let result = await dbhelper.execute('addReview', {
            reviewId:id,userId, profileId, review, rating
        })
        
        if(result.rowsAffected[0] < 1){
            return res.json({
                error:'Could not add review'
            })
        }else 
            return res.json({
                message:'Review added successfully'
            })




    } catch (error:any) {
        return res.json({
            
            error:error.originalError.info.message
        })
    }
}






export const getAllProfileReviews = async(req:Request, res:Response)=>{
    try {

        const profileId = req.params.id

        let profileReviews = (await dbhelper.execute('getAllProfileReviews', {profileId})).recordset

        return res.json({
            profileReviews:profileReviews
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}


export const getAllReviewsByUser = async(req:Request, res:Response)=>{
    try {

        const userId = req.params.id

        let reviewsByUser = (await dbhelper.execute('getAllReviewsByUser', {userId})).recordset

        return res.json({
            reviewsByUser:reviewsByUser
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}








export const getOneReview = async(req:Request, res:Response)=>{
    try {

        const id = req.params.id


        let review = (await dbhelper.execute('getOneReview', {reviewId:id})).recordset

        return res.json({
            review:review
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}




export const deleteReview = async(req:Request, res:Response)=>{

    try {
        const id = req.params.id

        const result = (await dbhelper.execute('deleteReview', {reviewId:id})).rowsAffected

        return res.json({
            message:'Review deleted successfully'
        })
        
    } catch (error:any) {

        return res.json({
            error:error.originalError.message
        })
        
    }



}






export const updateReview = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id

        const{review, rating}= req.body

        const result = (await dbhelper.execute('updateReview', {
            reviewId:id, review, rating
        })).rowsAffected


        console.log(result);
        

        return res.json({
            message:"Review updated successfully"
        })
        


        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
}





















