CREATE OR ALTER PROCEDURE getOneClient(@userId VARCHAR(100))
AS
    BEGIN
        SELECT * FROM users WHERE @userId = userId AND isDeleted = 0
    END