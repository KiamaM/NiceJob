CREATE OR ALTER PROCEDURE getOneProfiles(@userId VARCHAR(100))
AS
BEGIN
    SELECT * FROM users u
    INNER JOIN listings l ON l.userId = u.userId
    WHERE u.userId = @userId AND role = 'specialist' AND l.isDeleted = 0
END;