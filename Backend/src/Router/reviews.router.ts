import { Router } from "express";
import { addReview, deleteReview, getAllProfileReviews, getAllReviewsByUser, getOneReview, updateReview } from "../Controllers/reviews.controller";


const reviewsRouter = Router()

reviewsRouter.get('/profile-reviews/:id', getAllProfileReviews)
reviewsRouter.get('/user-reviews/:id', getAllReviewsByUser)
reviewsRouter.get('/review/:id', getOneReview)
reviewsRouter.post('/', addReview)
reviewsRouter.put('/update-review/:id',  updateReview)
reviewsRouter.delete('/delete-review/:id', deleteReview)



export default reviewsRouter