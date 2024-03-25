export interface users{
    userId:string
    firstName:string
    lastName:string  
    phoneNumber:string
    role:string 
    email:string 
    password:string
}

export interface updatedUser{
    firstName:string
    lastName:string 
    phoneNumber:string  
    role:string 
    email:string 
    password:string
}

export interface resetPassword{
    phoneNumber:string  
    email:string 
    password:string
}