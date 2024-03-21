CREATE OR ALTER PROCEDURE getOneSpecialist(@userId VARCHAR(100))
AS
    BEGIN
        IF NOT EXISTS(SELECT * FROM users WHERE @userId = userId AND isDeleted = 0 AND role = 'specialist')
            BEGIN
                DECLARE @error VARCHAR(100) = 'No specialists to display at the moment'
                RAISERROR (@error,16, 1)
             END
        ELSE
            BEGIN
                SELECT * FROM users WHERE @userId = userId AND isDeleted = 0 AND role = 'specialist'
            END
    END


        