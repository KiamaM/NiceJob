export interface createdUser{
    firstName:string
    lastName:string 
    phoneNumber:string 
    role:string 
    email:string 
    password:string
}

export interface loginUserDetails{
    userId:string
    firstName:string
    lastName:string
    phoneNumber:string 
    role:string
    email:string
    password:string
    isWelcomed:string
    isDeleted:string
}

export interface updatedUser{
    firstName:string
    lastName:string 
    phoneNumber:string  
    role:string 
    email:string 
    password:string
}



