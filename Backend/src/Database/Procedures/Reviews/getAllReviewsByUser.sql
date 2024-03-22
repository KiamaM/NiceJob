CREATE OR ALTER PROCEDURE getAllReviewsByUser(@userId VARCHAR(100))
AS
    BEGIN
        IF NOT EXISTS(SELECT * FROM reviews WHERE userId = @userId AND isDeleted = 0 )
            BEGIN
                DECLARE @error VARCHAR(100) = 'No reviews to display at the moment'
                RAISERROR (@error,16, 1)
             END
    ELSE
        BEGIN
            SELECT * FROM reviews WHERE userId = @userId AND isDeleted = 0
        END   
     END