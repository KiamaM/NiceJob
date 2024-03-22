import { Router } from "express"
import { createListing, deleteListing, getAllListings, getOneListing, updateListing } from "../Controllers/listings.controller"
import { verifyToken } from "../Middlewares/verifyToken"

export const listingsRouter = Router()


listingsRouter.get('/', getAllListings)
listingsRouter.get('/listing/:id', getOneListing)
listingsRouter.post('/', createListing)
listingsRouter.put('/update-listing/:id', verifyToken, updateListing)
listingsRouter.delete('/delete-listing', verifyToken, deleteListing)


export default listingsRouter