CREATE OR ALTER PROCEDURE getOneAppointment(@profileId VARCHAR(100))
AS
        BEGIN
            SELECT * FROM specialistProfile WHERE profileId = @profileId AND isBooked = 1 AND isCancelled = 0
        END
    