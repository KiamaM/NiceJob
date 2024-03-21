
CREATE OR ALTER PROCEDURE deleteProfile(@userId VARCHAR(100))
AS
BEGIN
    SELECT * FROM users u
    INNER JOIN listings l ON l.userId = u.userId
    WHERE u.userId = @userId AND role = 'specialist'
    UPDATE listings SET isDeleted = 1 WHERE @userId = userId
END;