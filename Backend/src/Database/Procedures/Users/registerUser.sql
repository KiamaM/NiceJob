CREATE OR ALTER PROCEDURE registerUser(
    @userId VARCHAR(100),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50) ,
    @phoneNumber VARCHAR(20),
    @role VARCHAR(100),
    @email VARCHAR(100),
    @hashedPwd VARCHAR(300)
)

AS
BEGIN
    IF NOT EXISTS(SELECT * FROM users WHERE email = @email)
        BEGIN
            INSERT INTO users(userId, firstName, lastName,phoneNumber, role, email, password, registerDate)
            VALUES(@userId, @firstName, @lastName, @phoneNumber, @role, @email, @hashedPwd, GETDATE())
        END
    ELSE
        BEGIN
            DECLARE @error VARCHAR(100) = 'Email is already registered.Please log in'
            RAISERROR(@error, 16, 1);
            RETURN 
        END       
END