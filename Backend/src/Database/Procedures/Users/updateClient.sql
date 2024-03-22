CREATE OR ALTER PROCEDURE updateClient(
    @userId VARCHAR(100),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50) ,
    @phoneNumber VARCHAR(20),
    @email VARCHAR(100)
)
AS
    BEGIN
        UPDATE users SET 
                firstName=@firstName,
                lastName=@lastName, 
                phoneNumber = @phoneNumber,
                email=@email

            WHERE userId = @userId AND role = 'client'
    END
