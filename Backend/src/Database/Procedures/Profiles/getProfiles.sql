CREATE OR ALTER PROCEDURE getAllProfiles
AS
BEGIN
    SELECT * FROM users u
    INNER JOIN listings l ON l.userId = u.userId
    WHERE role = 'specialist' AND l.isDeleted = 0;
END;




