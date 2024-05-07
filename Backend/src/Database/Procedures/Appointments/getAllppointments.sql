CREATE OR ALTER PROCEDURE getAppointments(@userId VARCHAR(100))
AS
    BEGIN
        IF NOT EXISTS(SELECT * FROM specialistProfile WHERE isBooked = 1 AND userId = @userId)
            BEGIN
                DECLARE @error VARCHAR(100) = 'You have no appointments currently'
                RAISERROR (@error,16, 1)
             END
    ELSE
        BEGIN
            SELECT * FROM specialistProfile s
            INNER JOIN listings l ON l.userId = s.userId
            INNER JOIN users u ON u.userId = s.userId
            WHERE s.isBooked = 1 AND s.userId = @userId AND s.isCancelled = 0
        END
    END

