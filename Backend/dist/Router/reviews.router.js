"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_controller_1 = require("../Controllers/reviews.controller");
const verifyToken_1 = require("../Middlewares/verifyToken");
const auth_controller_1 = require("../Controllers/auth.controller");
const reviewsRouter = (0, express_1.Router)();
reviewsRouter.get('/profile-reviews/:id', reviews_controller_1.getAllProfileReviews);
reviewsRouter.get('/user-reviews/:id', verifyToken_1.verifyToken, (0, auth_controller_1.authorize)('client'), reviews_controller_1.getAllReviewsByUser);
reviewsRouter.get('/review/:id', reviews_controller_1.getOneReview);
reviewsRouter.post('/', verifyToken_1.verifyToken, (0, auth_controller_1.authorize)('client'), reviews_controller_1.addReview);
reviewsRouter.put('/update-review/:id', verifyToken_1.verifyToken, (0, auth_controller_1.authorize)('client'), reviews_controller_1.updateReview);
reviewsRouter.delete('/delete-review/:id', verifyToken_1.verifyToken, (0, auth_controller_1.authorize)('client', 'admin'), reviews_controller_1.deleteReview);
exports.default = reviewsRouter;
