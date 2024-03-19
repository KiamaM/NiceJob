import joi from 'joi'


export const registerUserValidation = joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    role:joi.string(),
    email: joi.string().required().email({
        minDomainSegments: 2, tlds:{
            allow:['com', 'ke']
        }
    }).message('The email format is invalid.'),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>\\/\\\\]{8,30}$'))
    .message('Password must be 8-30 characters and must contain a special character.')
})

export const loginUserValidation = joi.object({
    email: joi.string().required().email({
        minDomainSegments: 2, tlds:{
            allow:['com', 'ke']
        }
    }).message('The email format is invalid.'),
    password:joi.string().required()
})