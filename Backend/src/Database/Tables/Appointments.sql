CREATE TABLE specialistProfile(
    profileId VARCHAR(100) PRIMARY KEY NOT NULL,
    userId VARCHAR(100) UNIQUE NOT NULL,
    listingId VARCHAR(100) UNIQUE NOT NULL,
    isBooked BIT DEFAULT 0,
    isCancelled BIT DEFAULT 0,
    appointmentDate DATE,
    isDeleted BIT DEFAULT 0
)


SELECT * FROM specialistProfile

ALTER TABLE specialistProfile
ADD CONSTRAINT FK_specialistProfile_users FOREIGN KEY (userId) REFERENCES users(userId);

ALTER TABLE specialistProfile ADD appointmentDate DATE


ALTER TABLE specialistProfile
DROP CONSTRAINT UQ__speciali__CB9A1CFE31E05FA1;



ALTER TABLE specialistProfile ADD isDeleted BIT DEFAULT 0


ALTER TABLE specialistProfile
ADD CONSTRAINT FK_specialistProfile_listing FOREIGN KEY (listingId) REFERENCES listings(serviceId);