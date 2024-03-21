import { Router } from "express";
import { cancelAppointment, getAppointments, getOneAppointment, reschedule, scheduleAppointment } from "../Controllers/profile.controller";

const appointmentRouter =Router()


appointmentRouter.get('/:id', getAppointments)
appointmentRouter.get('/appointment/:id', getOneAppointment)
appointmentRouter.post('/', scheduleAppointment)
appointmentRouter.put('/reschedule/:id', reschedule)
appointmentRouter.delete('/cancel-appointment/:id', cancelAppointment)




export default appointmentRouter