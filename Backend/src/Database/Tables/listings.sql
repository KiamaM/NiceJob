CREATE TABLE listings(
    serviceId VARCHAR(100) PRIMARY KEY NOT NULL,
    userId VARCHAR(100) NOT NULL,
    serviceName VARCHAR(50) NOT NULL,
    serviceDescription VARCHAR(700) NOT NULL,
    serviceCategory VARCHAR(100) NOT NULL,
    location VARCHAR(300) NOT NULL,
    rates NUMERIC NOT NULL,
    openTime TIME NOT NULL,
    closeTime TIME NOT NULL,
    experience NUMERIC  NOT NULL,
    serviceImage VARCHAR(300) NOT NULL,
    isBooked BIT DEFAULT 0,
    activeDate DATE,
    isDeleted BIT DEFAULT 0
    )



SELECT * FROM listings

DELETE FROM listings;

DROP TABLE  listings

ALTER TABLE listings ADD activeDate DATE

ALTER TABLE listings ADD userId VARCHAR(100) NOT NULL

ALTER TABLE listings
ADD CONSTRAINT FK_listings_users FOREIGN KEY (userId) REFERENCES users(userId);


