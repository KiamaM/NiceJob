CREATE TABLE reviews(
    reviewId VARCHAR(100) PRIMARY KEY NOT NULL,
    userId VARCHAR(100) NOT NULL,
    profileId VARCHAR(100) NOT NULL,
    review VARCHAR(700) NOT NULL,
    rating NUMERIC NOT NULL,
    reviewDate DATE,
    isDeleted BIT DEFAULT 0
    )