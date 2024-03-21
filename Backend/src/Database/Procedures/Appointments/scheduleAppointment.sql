CREATE OR ALTER PROCEDURE scheduleAppointment(
    @profileId VARCHAR(100),
    @userId VARCHAR(100),
    @listingId VARCHAR(100),
    @appointmentDate DATE
)
AS 
    BEGIN
        IF NOT EXISTS(SELECT * FROM specialistProfile WHERE userId = @userId)
            BEGIN
                INSERT INTO specialistProfile(profileId,userId, listingId,isBooked, isCancelled, appointmentDate)
                    VALUES(@profileId,@userId, @listingId,1, 0,  @appointmentDate)
            END
        ELSE
            BEGIN
                
                DECLARE @error VARCHAR(100) = 'You have already scheduled an appointment'
                RAISERROR (@error,16, 1)
             END
    END


DROP PROCEDURE IF EXISTS bookProfile;
