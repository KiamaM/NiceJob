import Connection from "../../dbHelpers/dbHelper";
import { addReview, deleteReview, getAllProfileReviews, getAllReviewsByUser, getOneReview } from "../reviews.controller";

jest.mock('../../dbHelpers/dbHelper');



describe('addReview', () => {

    let res:any


    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Successfully add a review with valid userId, profileId, review, and rating
    it('should add a review when all parameters are valid', async () => {
        // Arrange
        const req = {
            body: {
                userId: 'validUserId',
                profileId: 'validProfileId',
                review: 'validReview',
                rating: 'validRating'
            }
        };

        const executeMock = (Connection.prototype.execute as jest.Mock).mockResolvedValue({ rowsAffected: [1] });

        // Act
        await addReview(req as any, res);

        // Assert
        expect(executeMock).toHaveBeenCalledWith('addReview', {
            reviewId: expect.any(String),
            userId: 'validUserId',
            profileId: 'validProfileId',
            review: 'validReview',
            rating: 'validRating'
        });
        expect(res.json).toHaveBeenCalledWith({ message: 'Review added successfully' });
    });

    // Handle and return errors when userId is missing or invalid
    it('should return an error when userId is missing or invalid', async () => {
        // Arrange
        const req = {
            body: {
                profileId: 'validProfileId',
                review: 'validReview',
                rating: 'validRating'
            }
        };


        // Act
        await addReview(req as any, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith({ error: 'Could not add review' });
    });
});



describe('getAllProfileReviews', () => {

    let res:any


    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Function successfully retrieves all reviews for a given profile ID
    it('should retrieve all reviews for a given profile ID', async () => {
        const req = {
            params: {
                id: 'profileId'
            }
        };

        const executeMock = (Connection.prototype.execute as jest.Mock).mockResolvedValue({ recordset: [] });

        await getAllProfileReviews(req as any, res);

        expect(executeMock).toHaveBeenCalledWith('getAllProfileReviews', { profileId: 'profileId' });
        expect(res.json).toHaveBeenCalledWith({ profileReviews: [] });
    });

    // Handles cases where the database connection fails
    it('should handle database connection failure', async () => {
        const req = {
            params: {
                id: 'profileId'
            }
        };

        const executeMock = (Connection.prototype.execute as jest.Mock).mockRejectedValue({ originalError: { message: 'Database connection failed' } });

        await getAllProfileReviews(req as any, res);

        expect(executeMock).toHaveBeenCalledWith('getAllProfileReviews', { profileId: 'profileId' });
        expect(res.json).toHaveBeenCalledWith({ error: 'Database connection failed' });
    });
});






describe('getAllReviewsByUser', () => {

    let res:any


    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })


    // Function successfully retrieves reviews for a given user ID
    it('should retrieve reviews for a given user ID', async () => {
      // Arrange
      const req = {
        params: {
          id: 'user123'
        }
      };

      const executeMock = (Connection.prototype.execute as jest.Mock).mockResolvedValue({ recordset: [{ reviewId: 'review123', userId: 'user123', content: 'Great product' }] });

      // Act
      await getAllReviewsByUser(req as any, res);

      // Assert
      expect(executeMock).toHaveBeenCalledWith('getAllReviewsByUser', { userId: 'user123' });
      expect(res.json).toHaveBeenCalledWith({
        reviewsByUser: [{ reviewId: 'review123', userId: 'user123', content: 'Great product' }]
      });
    });

    // Database connection fails
    it('should handle database connection failure', async () => {
      // Arrange
      const req = {
        params: {
          id: 'user123'
        }
      };

      const executeMock = (Connection.prototype.execute as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

      // Act
      await getAllReviewsByUser(req as any, res);

      // Assert
      expect(executeMock).toHaveBeenCalledWith('getAllReviewsByUser', { userId: 'user123' });
      expect(res.json).toHaveBeenCalledWith({
        error: 'Database connection failed'
      });
    });
});



describe('getOneReview', () => {

    let res:any


    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Returns a JSON object with a review when given a valid review ID.
    it('should return a JSON object with a review when given a valid review ID', async () => {
      // Arrange
      const req = {
        params: {
          id: 'review123'
        }
      };

      const executeMock = (Connection.prototype.execute as jest.Mock).mockResolvedValue({ recordset: [{ reviewId: 'review123', userId: 'user123', content: 'Great product' }] });

      // Act
      await getOneReview(req as any, res);

      // Assert
      expect(executeMock).toHaveBeenCalledWith('getOneReview', { reviewId: 'review123' });
      expect(res.json).toHaveBeenCalledWith({
        review: [{ reviewId: 'review123', userId: 'user123', content: 'Great product' }]
      });
    });

    // Throws an error when the database query fails.
    it('should throw an error when the database query fails', async () => {
      // Arrange
      const req = {
        params: {
          id: 'review123'
        }
      };

      const executeMock = (Connection.prototype.execute as jest.Mock).mockRejectedValue(new Error('Database query failed'));

      // Act
      await getOneReview(req as any, res);

      // Assert
      expect(executeMock).toHaveBeenCalledWith('getOneReview', { reviewId: 'review123' });
      expect(res.json).toHaveBeenCalledWith({
        error: 'Database query failed'
      });
    });
});




describe('deleteReview', () => {

    let res:any


    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Successfully delete a review with a valid review ID
    it('should delete a review when given a valid review ID', async () => {
        // Arrange
        const req = {
            params: {
                id: 'validReviewId'
            }
        };


        (Connection.prototype.execute as jest.Mock) = jest.fn().mockReturnValue({ rowsAffected: 1 });

        // Act
        await deleteReview(req as any, res);

        // Assert
        expect(Connection.prototype.execute as jest.Mock).toHaveBeenCalledWith('deleteReview', { reviewId: 'validReviewId' });
        expect(res.json).toHaveBeenCalledWith({
            message: 'Review deleted successfully'
        });
    });

    // Handle and return an error response if the review ID is not a valid UUID
    it('should return an error response when given an invalid review ID', async () => {
        // Arrange
        const req = {
            params: {
                id: 'invalidReviewId'
            }
        };

        (Connection.prototype.execute as jest.Mock) = jest.fn().mockImplementation(() => {
            throw new Error('Invalid UUID');
        });

        // Act
        await deleteReview(req as any, res);

        // Assert
        expect(Connection.prototype.execute as jest.Mock).toHaveBeenCalledWith('deleteReview', { reviewId: 'invalidReviewId' });
        expect(res.json).toHaveBeenCalledWith({
            error: 'Invalid UUID'
        });
    });
});




