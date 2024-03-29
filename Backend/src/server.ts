import express,  { NextFunction, Request, Response, json, } from 'express'
import cors from 'cors'
import userRouter from './Router/user.router'
import auth_router from './Router/auth.router'
import listingsRouter from './Router/listings.router'
import profileRouter from './Router/profiles.router'
import appointmentRouter from './Router/appointments.router'
import searchRouter from './Router/search.router'
import reviewsRouter from './Router/reviews.router'

const app = express()

app.use(cors())
app.use(json())


app.use('/users', userRouter)
app.use('/auth', auth_router)
app.use('/listings', listingsRouter)
app.use('/profiles', profileRouter)
app.use('/appointments', appointmentRouter)
app.use('/filter', searchRouter)
app.use('/reviews', reviewsRouter)



app.use((err:Error,req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message:err.message
    })
})

let port = 4500

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
    
})