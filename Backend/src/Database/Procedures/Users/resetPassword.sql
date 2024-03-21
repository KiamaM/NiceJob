CREATE OR ALTER PROCEDURE resetPassword(
    @email VARCHAR(250),
    @phoneNumber VARCHAR(20),
    @password VARCHAR(100)
)

AS
BEGIN
    SET NOCOUNT ON
    IF EXISTS (SELECT * FROM users WHERE email = @email AND phoneNumber = @phoneNumber)
    BEGIN
    
        UPDATE users 
        SET password = @password
        RETURN 1
    END
    ELSE
    BEGIN
            DECLARE @error VARCHAR(100) = 'Kindly confirm your details'
            RAISERROR(@error, 16, 1);
            RETURN     
    END
END;


 