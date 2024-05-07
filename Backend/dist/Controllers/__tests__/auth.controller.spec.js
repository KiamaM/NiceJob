"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_controller_1 = require("../auth.controller");
//Login user test suite
describe('Login test cases', () => {
    let res;
    //define json
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    //test cases
    it('Successfully logs in a user and returns a token', 
    //define our login user function
    () => __awaiter(void 0, void 0, void 0, function* () {
        //define our expected user for logins as we should not make calls to the backend
        //The check for the user is the first one from the returned array
        //Start with the returned user
        let expectedUser = {
            userId: "03e03cc8-4130-4331-861c-fd75c0b3ddcc",
            firstName: "Stanley",
            lastName: "Nganga",
            phoneNumber: 123456235678,
            role: 'client',
            email: "ngangastanley903@gmail.com",
            password: "$2b$05$V7L9xpt5nwvB6M7zpzNwEeIbQz3/jlNnD14J6DtbUmqJoZboq1TUa",
            isDeleted: false,
            isWelcomed: true
        };
        //Once we have the expected user, we create our request to login the user
        const req = {
            body: {
                email: expectedUser.email,
                password: expectedUser.password
            }
        };
        //Spy on mssql
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [expectedUser]
            })
        });
        //Once we have sent the email and password, we use bcrypt 
        //To compare passwords
        jest.spyOn(bcrypt_1.default, 'compare').mockResolvedValueOnce(true);
        //Spy on jwt on the sign method with a hard coded mock token
        jest.spyOn(jsonwebtoken_1.default, 'sign').mockReturnValueOnce('generated-token-ccdecdecec-xffccececc-xfsfcfc');
        //Call the function
        yield (0, auth_controller_1.loginUser)(req, res);
        //Write assertions
        expect(res.json).toHaveBeenCalledWith({
            message: "Login Success",
            token: 'generated-token-ccdecdecec-xffccececc-xfsfcfc'
        });
    }));
    //Test validation
    test('Returns a validation error if email or password is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: '',
                password: ''
            }
        };
        yield (0, auth_controller_1.loginUser)(req, res);
        //Assertions
        expect(res.json).toHaveBeenCalledWith({
            error: "\"email\" is not allowed to be empty"
        });
    }));
    //Test if a user is not found
    test('Returns an error if email is not found i db', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: 'incorrectemail@gmail.com',
                password: "1232344"
            }
        };
        //Spy on mssql
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: []
            })
        });
        yield (0, auth_controller_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            error: "User not found"
        });
    }));
    //Handles incorrect password
    it('Returns an error for incorrect password', 
    //define our login user function
    () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: 'ngangastanley903@gmail.com',
                password: 'wrongpassword'
            }
        };
        //Spy on mssql
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [{
                        email: 'correct@gmail.com',
                        password: 'hashedpassword-gccceceed-fscfccfc'
                    }]
            })
        });
        //Once we have sent the email and password, we use bcrypt 
        //To compare passwords
        jest.spyOn(bcrypt_1.default, 'compare').mockResolvedValueOnce(false);
        //Call the function
        yield (0, auth_controller_1.loginUser)(req, res);
        //Write assertions
        expect(res.json).toHaveBeenCalledWith({
            error: "Incorrect password",
        });
    }));
});
