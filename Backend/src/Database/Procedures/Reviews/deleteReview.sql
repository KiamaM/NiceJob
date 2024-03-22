CREATE OR ALTER PROCEDURE deleteReview(@reviewId VARCHAR(100))
AS
    BEGIN                
        UPDATE reviews SET isDeleted = 1 WHERE @reviewId = reviewId
    END