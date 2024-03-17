import express,  { NextFunction, Request, Response, json, } from 'express'
import cors from 'cors'
import userRouter from './Router/user.router'

const app = express()

app.use(cors())
app.use(json())


app.use('/users', userRouter)



app.use((err:Error,req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message:err.message
    })
})

let port = 4500

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
    
})