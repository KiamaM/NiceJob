CREATE OR ALTER PROCEDURE updateSpecialist(
    @userId VARCHAR(100),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50) ,
    @email VARCHAR(100)
)
AS
    BEGIN
        UPDATE users SET 
                firstName=@firstName,
                lastName=@lastName, 
                email=@email

            WHERE userId = @userId
    END