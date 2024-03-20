CREATE OR ALTER PROCEDURE getOneSpecialist(@userId VARCHAR(100))
AS
    BEGIN
        SELECT * FROM users WHERE @userId = userId
    END