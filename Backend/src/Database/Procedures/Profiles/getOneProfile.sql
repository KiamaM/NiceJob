CREATE OR ALTER PROCEDURE getOneProfile(@serviceId VARCHAR(100))
AS
BEGIN
    SELECT * FROM users u
    INNER JOIN listings l ON l.userId = u.userId
    WHERE l.serviceId = @serviceId AND role = 'specialist' AND l.isDeleted = 0 AND u.isDeleted = 0
END;