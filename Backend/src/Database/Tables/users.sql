CREATE TABLE users(
    userId VARCHAR(100) UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    role VARCHAR(100) NOT NULL DEFAULT 'client',
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(300) NOT NULL,
    isWelcomed BIT DEFAULT 0,
    isDeleted BIT DEFAULT 0  
    )

    SELECT * FROM users