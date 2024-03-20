CREATE OR ALTER PROCEDURE getAllClients
AS
    BEGIN
        IF NOT EXISTS(SELECT * FROM users WHERE isDeleted = 0 AND role = 'client')
            BEGIN
                DECLARE @error VARCHAR(100) = 'No clients to display at the moment'
                RAISERROR (@error,16, 1)
             END
    ELSE
        BEGIN
            SELECT * FROM users WHERE isDeleted = 0 AND  role = 'client' 
        END
    END
