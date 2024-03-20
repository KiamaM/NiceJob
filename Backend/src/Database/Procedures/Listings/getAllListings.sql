CREATE OR ALTER PROCEDURE getALLLIstings
AS
    BEGIN
        IF NOT EXISTS(SELECT * FROM listings WHERE isDeleted = 0 AND isBooked = 0)
            BEGIN
                DECLARE @error VARCHAR(100) = 'No listings to display at the moment'
                RAISERROR (@error,16, 1)
             END
    ELSE
        BEGIN
            SELECT * FROM listings WHERE isDeleted = 0 AND  isBooked = 0 
        END   
     END