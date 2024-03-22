CREATE OR ALTER PROCEDURE updateReview(
    @reviewId VARCHAR(100),
    @review VARCHAR(700),
    @rating NUMERIC
)
AS
    BEGIN
        UPDATE reviews SET 
            review = @review,
            rating = @rating

            WHERE reviewId = @reviewId
    END