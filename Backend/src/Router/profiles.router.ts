import { Router } from "express";
import { deleteProfile, getAllProfiles, getOneProfile, getProfilesBySpecialist } from "../Controllers/profile.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const profileRouter = Router()

profileRouter.get('/', getAllProfiles)
profileRouter.get('/:id', getOneProfile)
profileRouter.get('/my-profiles/:id', getProfilesBySpecialist)
profileRouter.delete('/delete/:id',verifyToken, deleteProfile)





export default profileRouter