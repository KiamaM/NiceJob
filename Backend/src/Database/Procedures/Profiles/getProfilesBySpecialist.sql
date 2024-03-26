CREATE OR ALTER PROCEDURE getProfilesBySpecialist(@userId VARCHAR(100))
AS
BEGIN
    SELECT * FROM users u
    INNER JOIN listings l ON l.userId = u.userId
    WHERE role = 'specialist' AND l.isDeleted = 0 AND (u.userId = @userId)
END;