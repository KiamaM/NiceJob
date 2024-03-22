import { Router } from "express";
import { addReview, deleteReview, getAllProfileReviews, getAllReviewsByUser, getOneReview, updateReview } from "../Controllers/reviews.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const reviewsRouter = Router()

reviewsRouter.get('/profile-reviews/:id', getAllProfileReviews)
reviewsRouter.get('/user-reviews/:id',verifyToken, getAllReviewsByUser)
reviewsRouter.get('/review/:id', getOneReview)
reviewsRouter.post('/',verifyToken, addReview)
reviewsRouter.put('/update-review/:id', verifyToken, updateReview)
reviewsRouter.delete('/delete-review/:id', verifyToken, deleteReview)



export default reviewsRouter