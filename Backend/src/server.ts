import express,  { NextFunction, Request, Response, json, } from 'express'
import cors from 'cors'
import userRouter from './Router/user.router'
import auth_router from './Router/auth.router'
import listingsRouter from './Router/listings.router'

const app = express()

app.use(cors())
app.use(json())


app.use('/users', userRouter)
app.use('/auth', auth_router)
app.use('/listings', listingsRouter)



app.use((err:Error,req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message:err.message
    })
})

let port = 4500

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
    
})