import { Router } from "express";
import { registerUser, getAllClients, getOneClient, deleteClient, updateClient, resetPassword, getAllSpecialists, getOneSpecialist, deleteSpecialist, updateSpecialist } from '../Controllers/users.controller';
import { verifyToken } from "../Middlewares/verifyToken";

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.get('/all-clients',verifyToken, getAllClients)
userRouter.get('/client/:id',verifyToken, getOneClient)
userRouter.delete('/client/delete/:id',verifyToken, deleteClient)
userRouter.put('/client/update/:id',verifyToken, updateClient)
userRouter.put('/reset-password', resetPassword);


userRouter.get('/all-specialists',verifyToken, getAllSpecialists)
userRouter.get('/specialist/:id',verifyToken, getOneSpecialist)
userRouter.delete('/specialist/delete/:id',verifyToken, deleteSpecialist)
userRouter.put('/specialist/update/:id',verifyToken, updateSpecialist)




// userRouter.route('/all-clients').get(verifyToken, authorize('admin'), getAllClients)







export default userRouter