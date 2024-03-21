CREATE OR ALTER PROCEDURE filterByCategory(@serviceCategory VARCHAR(100))
AS
    BEGIN
        IF NOT EXISTS(SELECT * FROM listings WHERE isDeleted = 0 AND serviceCategory = @serviceCategory)
            BEGIN
                DECLARE @error VARCHAR(100) = 'No matching results found'
                RAISERROR (@error,16, 1)
             END
    ELSE
        BEGIN
            SELECT * FROM listings l
            INNER JOIN users u ON u.userId = l.userId
            WHERE l.isDeleted = 0 AND l.serviceCategory = @serviceCategory
        END
    END