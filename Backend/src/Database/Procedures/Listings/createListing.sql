CREATE OR ALTER PROCEDURE createListing(
    @serviceId VARCHAR(100),
    @serviceName VARCHAR(50) ,
    @serviceDescription VARCHAR(700),
    @serviceCategory VARCHAR(100),
    @location VARCHAR(300),
    @rates NUMERIC,
    @openTime TIME,
    @closeTime TIME,
    @experience NUMERIC,
    @serviceImage VARCHAR(300)
)
AS 
    BEGIN
        INSERT INTO listings(serviceId, serviceName,serviceDescription, serviceCategory, location, rates, openTime, closeTime, experience, serviceImage, activeDate)
            VALUES(@serviceId, @serviceName,@serviceDescription, @serviceCategory, @location, @rates, @openTime, @closeTime, @experience, @serviceImage, GETDATE())
    END