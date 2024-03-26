export interface appointment{
    profileId:string
    userId:string
    listingId:string
}

export interface userAppointments{
    profileId:string
    userId:string
    listingId:string
    serviceId:string
    serviceName :string
    serviceDescription:string
    serviceCategory:string
    location:string
    rates:string
    openTime:string
    closeTime:string
    experience:string
    serviceImage:string
    firstName:string
    lastName:string  
    phoneNumber:string
}
