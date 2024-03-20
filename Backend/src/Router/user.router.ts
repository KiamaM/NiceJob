import { Router } from "express";
import { registerUser, getAllClients, getOneClient, deleteClient, updateClient } from '../Controllers/users.controller';
import { verifyToken } from "../Middlewares/verifyToken";

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.get('/all-clients',verifyToken, getAllClients)
userRouter.get('/client/:id',verifyToken, getOneClient)
userRouter.delete('/client/delete/:id',verifyToken, deleteClient)
userRouter.put('/client/update/:id',verifyToken, updateClient)






export default userRouter