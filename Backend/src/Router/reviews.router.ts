import { Router } from "express";
import { addReview, deleteReview, getAllProfileReviews, getAllReviewsByUser, getOneReview, updateReview } from "../Controllers/reviews.controller";
import { verifyToken } from "../Middlewares/verifyToken";
import { authorize } from "../Controllers/auth.controller";

const reviewsRouter = Router()

reviewsRouter.get('/profile-reviews/:id', getAllProfileReviews)
reviewsRouter.get('/user-reviews/:id',verifyToken,authorize('client'), getAllReviewsByUser)
reviewsRouter.get('/review/:id', getOneReview)
reviewsRouter.post('/',verifyToken,authorize('client'), addReview)
reviewsRouter.put('/update-review/:id', verifyToken,authorize('client'), updateReview)
reviewsRouter.delete('/delete-review/:id', verifyToken,authorize('client', 'admin'), deleteReview)



export default reviewsRouter