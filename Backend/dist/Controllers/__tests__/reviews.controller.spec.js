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
const dbHelper_1 = __importDefault(require("../../dbHelpers/dbHelper"));
const reviews_controller_1 = require("../reviews.controller");
jest.mock('../../dbHelpers/dbHelper');
describe('addReview', () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Successfully add a review with valid userId, profileId, review, and rating
    it('should add a review when all parameters are valid', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = {
            body: {
                userId: 'validUserId',
                profileId: 'validProfileId',
                review: 'validReview',
                rating: 'validRating'
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockResolvedValue({ rowsAffected: [1] });
        // Act
        yield (0, reviews_controller_1.addReview)(req, res);
        // Assert
        expect(executeMock).toHaveBeenCalledWith('addReview', {
            reviewId: expect.any(String),
            userId: 'validUserId',
            profileId: 'validProfileId',
            review: 'validReview',
            rating: 'validRating'
        });
        expect(res.json).toHaveBeenCalledWith({ message: 'Review added successfully' });
    }));
    // Handle and return errors when userId is missing or invalid
    it('should return an error when userId is missing or invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = {
            body: {
                profileId: 'validProfileId',
                review: 'validReview',
                rating: 'validRating'
            }
        };
        // Act
        yield (0, reviews_controller_1.addReview)(req, res);
        // Assert
        expect(res.json).toHaveBeenCalledWith({ error: 'Could not add review' });
    }));
});
describe('getAllProfileReviews', () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Function successfully retrieves all reviews for a given profile ID
    it('should retrieve all reviews for a given profile ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: 'profileId'
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockResolvedValue({ recordset: [] });
        yield (0, reviews_controller_1.getAllProfileReviews)(req, res);
        expect(executeMock).toHaveBeenCalledWith('getAllProfileReviews', { profileId: 'profileId' });
        expect(res.json).toHaveBeenCalledWith({ profileReviews: [] });
    }));
    // Handles cases where the database connection fails
    it('should handle database connection failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: 'profileId'
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockRejectedValue({ originalError: { message: 'Database connection failed' } });
        yield (0, reviews_controller_1.getAllProfileReviews)(req, res);
        expect(executeMock).toHaveBeenCalledWith('getAllProfileReviews', { profileId: 'profileId' });
        expect(res.json).toHaveBeenCalledWith({ error: 'Database connection failed' });
    }));
});
describe('getAllReviewsByUser', () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Function successfully retrieves reviews for a given user ID
    it('should retrieve reviews for a given user ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = {
            params: {
                id: 'user123'
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockResolvedValue({ recordset: [{ reviewId: 'review123', userId: 'user123', content: 'Great product' }] });
        // Act
        yield (0, reviews_controller_1.getAllReviewsByUser)(req, res);
        // Assert
        expect(executeMock).toHaveBeenCalledWith('getAllReviewsByUser', { userId: 'user123' });
        expect(res.json).toHaveBeenCalledWith({
            reviewsByUser: [{ reviewId: 'review123', userId: 'user123', content: 'Great product' }]
        });
    }));
    // Database connection fails
    it('should handle database connection failure', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = {
            params: {
                id: 'user123'
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockRejectedValue(new Error('Database connection failed'));
        // Act
        yield (0, reviews_controller_1.getAllReviewsByUser)(req, res);
        // Assert
        expect(executeMock).toHaveBeenCalledWith('getAllReviewsByUser', { userId: 'user123' });
        expect(res.json).toHaveBeenCalledWith({
            error: 'Database connection failed'
        });
    }));
});
describe('getOneReview', () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Returns a JSON object with a review when given a valid review ID.
    it('should return a JSON object with a review when given a valid review ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = {
            params: {
                id: 'review123'
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockResolvedValue({ recordset: [{ reviewId: 'review123', userId: 'user123', content: 'Great product' }] });
        // Act
        yield (0, reviews_controller_1.getOneReview)(req, res);
        // Assert
        expect(executeMock).toHaveBeenCalledWith('getOneReview', { reviewId: 'review123' });
        expect(res.json).toHaveBeenCalledWith({
            review: [{ reviewId: 'review123', userId: 'user123', content: 'Great product' }]
        });
    }));
    // Throws an error when the database query fails.
    it('should throw an error when the database query fails', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = {
            params: {
                id: 'review123'
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockRejectedValue(new Error('Database query failed'));
        // Act
        yield (0, reviews_controller_1.getOneReview)(req, res);
        // Assert
        expect(executeMock).toHaveBeenCalledWith('getOneReview', { reviewId: 'review123' });
        expect(res.json).toHaveBeenCalledWith({
            error: 'Database query failed'
        });
    }));
});
describe('deleteReview', () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Successfully delete a review with a valid review ID
    it('should delete a review when given a valid review ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = {
            params: {
                id: 'validReviewId'
            }
        };
        dbHelper_1.default.prototype.execute = jest.fn().mockReturnValue({ rowsAffected: 1 });
        // Act
        yield (0, reviews_controller_1.deleteReview)(req, res);
        // Assert
        expect(dbHelper_1.default.prototype.execute).toHaveBeenCalledWith('deleteReview', { reviewId: 'validReviewId' });
        expect(res.json).toHaveBeenCalledWith({
            message: 'Review deleted successfully'
        });
    }));
    // Handle and return an error response if the review ID is not a valid UUID
    it('should return an error response when given an invalid review ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = {
            params: {
                id: 'invalidReviewId'
            }
        };
        dbHelper_1.default.prototype.execute = jest.fn().mockImplementation(() => {
            throw new Error('Invalid UUID');
        });
        // Act
        yield (0, reviews_controller_1.deleteReview)(req, res);
        // Assert
        expect(dbHelper_1.default.prototype.execute).toHaveBeenCalledWith('deleteReview', { reviewId: 'invalidReviewId' });
        expect(res.json).toHaveBeenCalledWith({
            error: 'Invalid UUID'
        });
    }));
});
