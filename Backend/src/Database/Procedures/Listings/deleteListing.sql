CREATE OR ALTER PROCEDURE deleteListing(@serviceId VARCHAR(100))
AS
    BEGIN                
        UPDATE listings SET isDeleted = 1 WHERE @serviceId = serviceId
    END