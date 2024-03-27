import bcrypt from 'bcrypt';
import mssql from 'mssql';
import json, { Request } from 'express';
import { deleteClient, getAllClients, getAllSpecialists, getOneClient, registerUser, resetPassword, updateClient } from '../users.controller';
import Connection from '../../dbHelpers/dbHelper';

const dbhelper = new Connection




//Register Test Suite



//Start by defining the test suite

describe("User registration", ()=>{
    //The function has a request and a response as its arguments. 
    //We start by defining them
    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    //test cases
    //Define the createUser function.
    //It is an asynchronous function
    it("Successfully registers a user",
        async()=>{
            //Define the request body

            const req = {
                body:{
                    firstName:"May",
                    lastName:"Dean",
                    phoneNumber:'12345672345',
                    role:'client',
                    email:"named123@mailesd.com",
                    password:"Passed2345623456$"  
                }
            }


            //Mimic password hashing
            jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("hashedpwdjnjcefrbbgrgbjggjbgbg" as never)


            //To chain the inputs when not using a db helper
            const mockedInput = jest.fn().mockReturnThis()
            //Mock the execute bit
            //We expect an object with an array of rows affected with just one user created
            const mockedExecute = jest.fn().mockResolvedValue({rowsAffected:[1]})

            const mockedDbRequest ={
                input: mockedInput,
                execute:mockedExecute
            }

            const mockedPool = {
                req:jest.fn().mockReturnValue(mockedDbRequest)
            }
            jest.spyOn(mssql,"connect").mockResolvedValue(mockedPool as never)

            //Act after arranging
            //Call the create user function
            await registerUser(req as any, res)

            expect(res.json).toHaveBeenCalledWith({
                message:"Account created successfully"
            })
        }
    )


    // Test with missing user input fields
    it('should return an error message when user input fields are missing', async () => {
      // Mock the necessary dependencies
      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '', // Missing phoneNumber field
          role: 'user',
          email: 'john.doe@example.com',
          password: 'Password123!'
        }
      };

      // Call the registerUser function
      await registerUser(req as any, res);

      // Assert that an error message is returned
      expect(res.json).toHaveBeenCalledWith({
        error: "\"phoneNumber\" is not allowed to be empty"
      });
    });
});








//Client tests

describe('getAllClients', () => {

    // Returns a JSON object with a 'clients' property containing an array of client objects when the function is called with valid parameters and the database query is successful.
    it('should return a JSON object with a \'clients\' property containing an array of client objects when the function is called with valid parameters and the database query is successful', async () => {
        // Mocking the execute method of dbhelper
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected:[1]})

        const mockedDbRequest ={
            execute:mockedExecute
        }

        const mockedPool = {
            req:jest.fn().mockReturnValue(mockedDbRequest)
        }
        jest.spyOn(mssql,"connect").mockResolvedValue(mockedPool as never)
        // Mocking the response object
        const res: any = {
            json: jest.fn()
        };

        // Calling the function
        const req: Request = {} as Request;

        await getAllClients(req, res);

        // Assertion
        expect(res.json).toHaveBeenCalledWith({
           "clients": [ 
                {
                  "userId": "03e03cc8-4130-4331-861c-fd75c0b3ddcc",
                  "firstName": "Stanley",
                  "lastName": "Nganga",
                  "phoneNumber": "123456235678",
                  "role": "client",
                  "email": "ngangastanley903@gmail.com",
                  "password": "$2b$05$V7L9xpt5nwvB6M7zpzNwEeIbQz3/jlNnD14J6DtbUmqJoZboq1TUa",
                  "isWelcomed": true,
                  "isDeleted": false,
                  "registerDate": "2024-03-26T00:00:00.000Z"
                },
                {
                  "userId": "048ecee2-3f96-4657-9cf9-962249eeb02b",
                  "firstName": "John",
                  "lastName": "Doe",
                  "phoneNumber": "123451234123",
                  "role": "client",
                  "email": "john@gmail.com",
                  "password": "$2b$05$9zW1tv9bQsf.gYz5G1pP9ewSq7DgdWYbShXZbtqFuM/KgoNij.IMy",
                  "isWelcomed": true,
                  "isDeleted": false,
                  "registerDate": "2024-03-25T00:00:00.000Z"
                },
                {
                  "userId": "1b66ebc7-feee-4e19-a62f-9d2cef68814e",
                  "firstName": "qwert",
                  "lastName": "sdvbnj",
                  "phoneNumber": "1234561234567",
                  "role": "client",
                  "email": "qwerty@awsedrfg.com",
                  "password": "$2b$05$9zW1tv9bQsf.gYz5G1pP9ewSq7DgdWYbShXZbtqFuM/KgoNij.IMy",
                  "isWelcomed": true,
                  "isDeleted": false,
                  "registerDate": "2024-03-23T00:00:00.000Z"
                },
                {
                  "userId": "2fd3fd1c-97e1-4cd3-bd21-7088a9fb9ead",
                  "firstName": "D",
                  "lastName": "M",
                  "phoneNumber": "12345671234",
                  "role": "client",
                  "email": "muriithikiamad1+1234@gmail.com",
                  "password": "$2b$05$9zW1tv9bQsf.gYz5G1pP9ewSq7DgdWYbShXZbtqFuM/KgoNij.IMy",
                  "isWelcomed": true,
                  "isDeleted": false,
                  "registerDate": "2024-03-23T00:00:00.000Z"
                },
                {
                  "userId": "4c815a6a-4459-4e19-bbb5-a305b97b9393",
                  "firstName": "Jane",
                  "lastName": "Doe",
                  "phoneNumber": "5553553553553",
                  "role": "client",
                  "email": "mail@mail.com",
                  "password": "$2b$05$9zW1tv9bQsf.gYz5G1pP9ewSq7DgdWYbShXZbtqFuM/KgoNij.IMy",
                  "isWelcomed": true,
                  "isDeleted": false,
                  "registerDate": "2024-03-21T00:00:00.000Z"
                },
                {
                  "userId": "6f81e89a-b3dd-47ea-ab65-d28c888dfbff",
                  "firstName": "qwerty",
                  "lastName": "qwertyu",
                  "phoneNumber": "123456234567",
                  "role": "client",
                  "email": "qwert@qwerdfgt.com",
                  "password": "$2b$05$9zW1tv9bQsf.gYz5G1pP9ewSq7DgdWYbShXZbtqFuM/KgoNij.IMy",
                  "isWelcomed": true,
                  "isDeleted": false,
                  "registerDate": "2024-03-23T00:00:00.000Z"
                },
                {
                  "userId": "9fea0eb7-0a64-4722-846e-ebadc4088ce0",
                  "firstName": "May",
                  "lastName": "Dean",
                  "phoneNumber": "12345672345",
                  "role": "client",
                  "email": "named123@mailesd.com",
                  "password": "hashedpwdjnjcefrbbgrgbjggjbgbg",
                  "isWelcomed": true,
                  "isDeleted": false,
                  "registerDate": "2024-03-27T00:00:00.000Z"
                },
                {
                  "userId": "a2ead68e-e2f7-464a-b3de-dcb6b949a438",
                  "firstName": "qwer",
                  "lastName": "qwerthj",
                  "phoneNumber": "12345678912",
                  "role": "client",
                  "email": "sdvbn12345@qsdn.com",
                  "password": "$2b$05$9zW1tv9bQsf.gYz5G1pP9ewSq7DgdWYbShXZbtqFuM/KgoNij.IMy",
                  "isWelcomed": true,
                  "isDeleted": false,
                  "registerDate": "2024-03-23T00:00:00.000Z"
                },
                {
                  "userId": "b19cb66b-3165-4b1a-ba45-923abe952d95",
                  "firstName": "John",
                  "lastName": "MN",
                  "phoneNumber": "1234123456",
                  "role": "client",
                  "email": "qwertyu@qwer.com",
                  "password": "$2b$05$9zW1tv9bQsf.gYz5G1pP9ewSq7DgdWYbShXZbtqFuM/KgoNij.IMy",
                  "isWelcomed": true,
                  "isDeleted": false,
                  "registerDate": "2024-03-23T00:00:00.000Z"
                },
                {
                  "userId": "cc4c14cd-9295-455d-81c9-c3d496278bb6",
                  "firstName": "John",
                  "lastName": "Doe",
                  "phoneNumber": "23451234567",
                  "role": "client",
                  "email": "mailit@mail.com",
                  "password": "$2b$05$9zW1tv9bQsf.gYz5G1pP9ewSq7DgdWYbShXZbtqFuM/KgoNij.IMy",
                  "isWelcomed": true,
                  "isDeleted": false,
                  "registerDate": "2024-03-25T00:00:00.000Z"
                }
              ]}
        );
    });

});



describe('getOneClient', () => {

    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Function successfully retrieves a client from the database and returns it as JSON
    it('should retrieve a client from the database and return it as JSON', async () => {
      // Mock the necessary dependencies
      const req = {
        params: {
          id: 'd18993ce-229e-4142-a1d3-aefde04b1855'
        }
      };


      // Mock the execute method of dbhelper
      dbhelper.execute = jest.fn().mockResolvedValue({ recordset: [{ id: '12345', name: 'John Doe' }] });

      // Call the function
      await getOneClient(req as any, res);

      // Check if the execute method of dbhelper was called with the correct arguments
      expect(dbhelper.execute).toHaveBeenCalledWith('getOneClient', { userId: 'd18993ce-229e-4142-a1d3-aefde04b1855' });

      // Check if the json method of res was called with the correct argument
      expect(res.json).toHaveBeenCalledWith({ user: [{ id: 'd18993ce-229e-4142-a1d3-aefde04b1855', name: 'John Doe' }] });
    });

    // ID parameter is not provided in the request, function handles and returns an error message
    it('should handle and return an error message when ID parameter is not provided in the request', async () => {
      // Mock the necessary dependencies
      const req = {
        params: {}
      };


      // Call the function
      await getOneClient(req as any, res);

      // Check if the json method of res was called with the correct argument
      expect(res.json).toHaveBeenCalledWith({ error: 'No clients to display at the moment' });
    });
});








//Specialist test suits
describe('deleteClient', () => {


    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })
    // Function successfully deletes a client account
    it('should delete a client account when valid ID is provided', async () => {
        // Mock the request and response objects
        const req = {
            params: {
                id: 'd18993ce-229e-4142-a1d3-aefde04b1855'
            }
        };


        // Mock the execute method of dbhelper to return a rowsAffected value
        dbhelper.execute = jest.fn().mockResolvedValue({ rowsAffected: 1 });

        // Call the deleteClient function
        await deleteClient(req as any, res);

        // Check if the response json method is called with the correct message
        expect(res.json).toHaveBeenCalledWith({
            message: 'Account deactivated successfully'
        });
    });

    // Function receives an invalid request object with missing client ID parameter
    it('should return an error message when invalid request object is provided', async () => {
        // Mock the request and response objects
        const req = {
            params: {}
        };


        // Call the deleteClient function
        await deleteClient(req as any, res);

        // Check if the response json method is called with the correct error message
        expect(res.json).toHaveBeenCalledWith({
            error: 'Missing client ID parameter'
        });
    });
});







//Specialist test suits
describe('updateClient', () => {
    
    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Successfully update client profile with valid input data
    it('should update client profile when valid input data is provided', async () => {
      // Mock the necessary dependencies
      const req = {
        params: { id: 'd18993ce-229e-4142-a1d3-aefde04b1855' },
        body: {
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '1234567890',
          email: 'john@gmail.com'
        }
      };


      // Call the updateClient function
      await updateClient(req as any, res);

      // Assert that the response is correct
      expect(res.json).toHaveBeenCalledWith({
        message: "Profile updated successfully"
      });
    });

    // Return an error response if client ID is not provided
    it('should return an error response when client ID is not provided', async () => {
      // Mock the necessary dependencies
      const req = {
        params: {},
        body: {}
      };


      // Call the updateClient function
      await updateClient(req as any, res);

      // Assert that the response is correct
      expect(res.json).toHaveBeenCalledWith({
        error: "client ID is not provided"
      });
    });
});








//Specialist test suits
describe('getAllSpecialists', () => {

    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Returns a JSON object with a 'specialists' property.
    it('should return a JSON object with a \'specialists\' property when specialists exist in the database', () => {
      // Mock the execute method of dbhelper to return a non-empty array of specialists
      dbhelper.execute = jest.fn().mockResolvedValue({ recordset: [{ specialistId: 1, name: 'John Doe' }] });

      // Invoke the getAllSpecialists function
      const req: Request = {} as Request;

      getAllSpecialists(req, res);

      // Expect the response to have a JSON object with a 'specialists' property
      expect(res.json).toHaveBeenCalledWith({
        specialists: [{ specialistId: 1, name: 'John Doe' }]
      });
    });

    // The database is empty, returns an empty array.
    it('should return an empty array when no specialists exist in the database', () => {
      // Mock the execute method of dbhelper to return an empty array of specialists
      dbhelper.execute = jest.fn().mockResolvedValue({ recordset: [] });

      // Invoke the getAllSpecialists function
      const req: Request = {} as Request;

      getAllSpecialists(req, res);

      // Expect the response to have a JSON object with an empty 'specialists' property
      expect(res.json).toHaveBeenCalledWith({
        specialists: []
      });
    });
});








//resetPassword




describe('resetPassword', () => {

    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })


    // Function successfully updates password for existing user.
    it('should update password when user exists', async () => {
      // Mock the request and response objects
      const req = {
        body: {
          email: 'test@example.com',
          phoneNumber: '1234567890',
          password: 'newpassword',
        },
      };

      // Mock the bcrypt.hash function
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

      // Mock the dbhelper.execute function
      dbhelper.execute = jest.fn().mockResolvedValue({  returnValue: 1  });


      // Call the resetPassword function
      await resetPassword(req as any, res);

      // Check if the password was hashed correctly
      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 5);

      // Check if the dbhelper.execute function was called with the correct parameters
      expect(dbhelper.execute).toHaveBeenCalledWith('resetPassword', {
        email: 'test@example.com',
        phoneNumber: '1234567890',
        password: 'hashedPassword',
      });

      // Check if the response was sent with the correct message
      expect(res.json).toHaveBeenCalledWith({
        message: 'Password updated successfully',
      });
    });

    // User not found in database, function returns appropriate error message.
    it('should return error message when user not found', async () => {
      // Mock the request and response objects
      const req = {
        body: {
          email: 'test@example.com',
          phoneNumber: '1234567890',
          password: 'newpassword',
        },
      };


      // Mock the bcrypt.hash function
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

      // Mock the dbhelper.execute function
      dbhelper.execute = jest.fn().mockResolvedValue({  returnValue: 0  });

      // Call the resetPassword function
      await resetPassword(req as any, res);

      // Check if the password was hashed correctly
      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 5);

      // Check if the dbhelper.execute function was called with the correct parameters
      expect(dbhelper.execute).toHaveBeenCalledWith('resetPassword', {
        email: 'test@example.com',
        phoneNumber: '1234567890',
        password: 'hashedPassword',
      });

      // Check if the response was sent with the correct message
      expect(res.json).toHaveBeenCalledWith({
        message: 'User not found',
      });
    });
});





