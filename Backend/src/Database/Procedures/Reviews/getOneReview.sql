CREATE OR ALTER PROCEDURE getOneReview(@reviewId VARCHAR(100))
AS
    BEGIN
        SELECT * FROM reviews WHERE @reviewId = reviewId AND isDeleted = 0
    END