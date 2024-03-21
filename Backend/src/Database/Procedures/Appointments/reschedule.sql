CREATE OR ALTER PROCEDURE reschedule(
    @profileId VARCHAR(100), 
    @appointmentDate DATE
)
AS
    BEGIN
        UPDATE specialistProfile SET 
            appointmentDate= @appointmentDate
            WHERE profileId = @profileId
    END