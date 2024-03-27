import { Request, Response } from 'express';
import mssql from 'mssql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginUser } from '../auth.controller';
import json from 'express';
//Login user test suite

describe('Login test cases', ()=>{
    let res:any


    //define json
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn().mockReturnThis()
        }
    })


    //test cases
    it('Successfully logs in a user and returns a token', 

        //define our login user function
        async()=>{
            //define our expected user for logins as we should not make calls to the backend
            //The check for the user is the first one from the returned array
            //Start with the returned user

            let expectedUser = {
                userId: "03e03cc8-4130-4331-861c-fd75c0b3ddcc",
                firstName: "Stanley",
                lastName: "Nganga",
                phoneNumber:123456235678,
                role:'client',
                email: "ngangastanley903@gmail.com",
                password: "$2b$05$V7L9xpt5nwvB6M7zpzNwEeIbQz3/jlNnD14J6DtbUmqJoZboq1TUa",
                isDeleted: false,
                isWelcomed: true
            }

            //Once we have the expected user, we create our request to login the user

            const req = {
                body:{
                    email:expectedUser.email,
                    password:expectedUser.password
                }
            }

            //Spy on mssql

            jest.spyOn(mssql,'connect').mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    recordset:[expectedUser]
                })
            } as never)

            //Once we have sent the email and password, we use bcrypt 
            //To compare passwords

            jest.spyOn(bcrypt,'compare').mockResolvedValueOnce(true as never)

            //Spy on jwt on the sign method with a hard coded mock token
            jest.spyOn(jwt, 'sign').mockReturnValueOnce('generated-token-ccdecdecec-xffccececc-xfsfcfc' as never)

            //Call the function
            await loginUser(req as Request, res)

            //Write assertions
            expect(res.json).toHaveBeenCalledWith({
                message:"Login Success",
                token:'generated-token-ccdecdecec-xffccececc-xfsfcfc'
            })
        }
    )


    //Test validation
    test('Returns a validation error if email or password is empty',
            async()=>{
                const req = {
                    body:{
                        email: '',
                        password: ''
                }
            }

            await loginUser(req as Request, res)

            //Assertions
            expect(res.json).toHaveBeenCalledWith({
                error: "\"email\" is not allowed to be empty"
            })
        }
    )


    //Test if a user is not found

    test('Returns an error if email is not found i db',
        async()=>{
            const req ={
                body:{
                    email:'incorrectemail@gmail.com',
                    password:"1232344"
                }
            }

            //Spy on mssql

            jest.spyOn(mssql,'connect').mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    recordset:[]
                })
            } as never)
            await loginUser(req as Request, res)

            expect(res.json).toHaveBeenCalledWith({
                error: "User not found"
            })
        }
    )

    //Handles incorrect password
    it('Returns an error for incorrect password', 

    //define our login user function
    async()=>{

        const req = {
            body:{
                email:'ngangastanley903@gmail.com',
                password:'wrongpassword'
            }
        }

        //Spy on mssql
        jest.spyOn(mssql,'connect').mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce({
                recordset:[{
                    email:'correct@gmail.com',
                    password:'hashedpassword-gccceceed-fscfccfc'
                }]
            })
        } as never)


        //Once we have sent the email and password, we use bcrypt 
        //To compare passwords

        jest.spyOn(bcrypt,'compare').mockResolvedValueOnce(false as never)


        //Call the function
        await loginUser(req as Request, res)

        //Write assertions
        expect(res.json).toHaveBeenCalledWith({
            error:"Incorrect password",
        })
    }
)
})