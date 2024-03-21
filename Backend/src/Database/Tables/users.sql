CREATE TABLE users(
    userId VARCHAR(100) PRIMARY KEY NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    role VARCHAR(100) NOT NULL DEFAULT 'client',
    email VARCHAR(100)  NOT NULL,
    password VARCHAR(300) NOT NULL,
    isWelcomed BIT DEFAULT 0,
    isDeleted BIT DEFAULT 0,
    registerDate DATE 
    )

    SELECT * FROM users

    DELETE FROM users;

    DROP TABLE users

ALTER TABLE users ADD registerDate DATE

ALTER TABLE users ADD phoneNumber VARCHAR(20) NOT NULL



