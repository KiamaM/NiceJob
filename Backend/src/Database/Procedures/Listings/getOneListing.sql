CREATE OR ALTER PROCEDURE getOneListing(@serviceId VARCHAR(100))
AS
    BEGIN
        SELECT * FROM listings WHERE @serviceId = serviceId AND isDeleted = 0
    END