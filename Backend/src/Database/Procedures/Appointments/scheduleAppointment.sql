CREATE OR ALTER PROCEDURE scheduleAppointment(
    @profileId VARCHAR(100),
    @userId VARCHAR(100),
    @listingId VARCHAR(100)
)
AS 
    BEGIN
        IF NOT EXISTS(SELECT * FROM specialistProfile WHERE listingId = @listingId)
            BEGIN
                INSERT INTO specialistProfile(profileId,userId, listingId,isBooked, isCancelled, appointmentDate)
                    VALUES(@profileId,@userId, @listingId,1, 0,  GETDATE())
            END
        ELSE
            BEGIN
                
                DECLARE @error VARCHAR(100) = 'The specialist is currently booked'
                RAISERROR (@error,16, 1)
             END
    END


DROP PROCEDURE IF EXISTS bookProfile;
