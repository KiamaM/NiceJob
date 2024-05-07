export interface reviews{
    reviewId:string
    userId:string
    profileId:string
    review:string
    rating:number
    reviewDate:Date
}

export interface profileReviews{
    reviewId:string
    userId:string
    profileId:string
    review:string
    rating:number
    reviewDate:Date
    firstName:string
}

export interface newReview{
    userId:string
    profileId:string
    review:string
    rating:number
}