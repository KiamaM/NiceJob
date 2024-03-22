import { Request, Response } from "express"
import Connection from "../dbHelpers/dbHelper"


const dbhelper = new Connection




export const filterByCategory = async(req:Request, res:Response)=>{
    try {

        const serviceCategory = req.params.serviceCategory

        let filterResults = (await dbhelper.execute('filterByCategory', {serviceCategory})).recordset

        return res.json({
            filterResults:filterResults
        })
        
    } catch (error:any) {
        res.json({
            error:error.originalError.message
        })
    }
}
