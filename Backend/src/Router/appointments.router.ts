import { Router } from "express";
import { cancelAppointment, getAppointments, getOneAppointment, reschedule, scheduleAppointment } from "../Controllers/profile.controller";
import { verifyToken } from "../Middlewares/verifyToken";
import { authorize } from "../Controllers/auth.controller";

const appointmentRouter =Router()


appointmentRouter.get('/:id',verifyToken, authorize('client','specialist'), getAppointments)
appointmentRouter.get('/appointment/:id',verifyToken, authorize('client','specialist'), getOneAppointment)
appointmentRouter.post('/',verifyToken, scheduleAppointment)
appointmentRouter.put('/reschedule/:id',verifyToken, authorize('client','specialist'), reschedule)
appointmentRouter.delete('/cancel-appointment/:id',verifyToken, authorize('client', 'specialist'), cancelAppointment)




export default appointmentRouter