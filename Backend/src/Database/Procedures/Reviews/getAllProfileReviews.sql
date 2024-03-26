CREATE OR ALTER PROCEDURE getAllProfileReviews(@profileId VARCHAR(100))
AS
    BEGIN
        IF NOT EXISTS(SELECT * FROM reviews WHERE profileId = @profileId AND isDeleted = 0 )
            BEGIN
                DECLARE @error VARCHAR(100) = 'No reviews to display at the moment'
                RAISERROR (@error,16, 1)
             END
    ELSE
        BEGIN
            SELECT * FROM reviews r
            INNER JOIN users u ON r.userId = u.userId
            WHERE profileId = @profileId AND r.isDeleted = 0
        END   
     END



