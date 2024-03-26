"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReview = exports.deleteReview = exports.getOneReview = exports.getAllReviewsByUser = exports.getAllProfileReviews = exports.addReview = void 0;
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const uuid_1 = require("uuid");
const dbhelper = new dbHelper_1.default;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        console.log(id);
        const { userId, profileId, review, rating } = req.body;
        console.log(req.body);
        let result = yield dbhelper.execute('addReview', {
            reviewId: id, userId, profileId, review, rating
        });
        if (result.rowsAffected[0] < 1) {
            return res.json({
                error: 'Could not add review'
            });
        }
        else
            return res.json({
                message: 'Review added successfully'
            });
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.addReview = addReview;
const getAllProfileReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.params.id;
        let profileReviews = (yield dbhelper.execute('getAllProfileReviews', { profileId })).recordset;
        return res.json({
            profileReviews: profileReviews
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.getAllProfileReviews = getAllProfileReviews;
const getAllReviewsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        let reviewsByUser = (yield dbhelper.execute('getAllReviewsByUser', { userId })).recordset;
        return res.json({
            reviewsByUser: reviewsByUser
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.getAllReviewsByUser = getAllReviewsByUser;
const getOneReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let review = (yield dbhelper.execute('getOneReview', { reviewId: id })).recordset;
        return res.json({
            review: review
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.getOneReview = getOneReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = (yield dbhelper.execute('deleteReview', { reviewId: id })).rowsAffected;
        return res.json({
            message: 'Review deleted successfully'
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.deleteReview = deleteReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { review, rating } = req.body;
        const result = (yield dbhelper.execute('updateReview', {
            reviewId: id, review, rating
        })).rowsAffected;
        console.log(result);
        return res.json({
            message: "Review updated successfully"
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.updateReview = updateReview;
