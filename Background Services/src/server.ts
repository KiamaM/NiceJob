import express from 'express'
import nodecron from 'node-cron'
import { welcomeUser } from './MailServices/welcomeUser';

const app = express()

const run = async()=>{
    nodecron.schedule('*/5 * * * * *', async()=>{
        console.log('checking for a new user');
        
        await welcomeUser()
    })
    
}

run()



let port = 4900

app.listen(port, ()=>{
    console.log('Server is running...');
        
})