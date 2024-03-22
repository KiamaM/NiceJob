CREATE OR ALTER PROCEDURE addReview(
    @reviewId VARCHAR(100),
    @userId VARCHAR(100),
    @profileId VARCHAR(100),
    @review VARCHAR(700),
    @rating NUMERIC
)
AS 
    BEGIN
        INSERT INTO reviews(reviewId,userId, profileId,review, rating, reviewDate, isDeleted)
            VALUES(@reviewId,@userId, @profileId,@review, @rating, GETDATE(), 0)
        
    END