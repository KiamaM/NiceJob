CREATE OR ALTER PROCEDURE cancelAppointment(@profileId VARCHAR(100))
AS
    BEGIN                
        UPDATE specialistProfile SET isCancelled = 1 WHERE @profileId = profileId
    END