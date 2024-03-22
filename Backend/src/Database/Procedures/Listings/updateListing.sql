CREATE OR ALTER PROCEDURE updateListing(
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
        UPDATE listings SET 
            @serviceName = serviceName,
            @serviceDescription = serviceDescription,
            @serviceCategory = serviceCategory,
            @location = location,
            @rates  = rates,
            @openTime  = openTime,
            @closeTime = closeTime,
            @experience = experience,
            @serviceImage = serviceImage

            WHERE serviceId = @serviceId
    END