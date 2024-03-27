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
const dbHelper_1 = __importDefault(require("../../dbHelpers/dbHelper"));
const listings_controller_1 = require("../listings.controller");
describe('createListing', () => {
    let res;
    //define json for the responses in res.json return
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Function successfully creates a new listing when valid input is provided
    it('should create a new listing when valid input is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the necessary dependencies
        const req = {
            body: {
                userId: '123',
                serviceName: 'Test Service',
                serviceDescription: 'Test Description',
                serviceCategory: 'Test Category',
                location: 'Test Location',
                rates: 'Test Rates',
                openTime: 'Test Open Time',
                closeTime: 'Test Close Time',
                experience: 'Test Experience',
                serviceImage: 'Test Image'
            }
        };
        // Invoke the function
        yield (0, listings_controller_1.createListing)(req, res);
        // Assert that the listing was created successfully
        expect(res.json).toHaveBeenCalledWith({
            message: 'Listing created successfully'
        });
    }));
    // Function returns an error message when unable to create new listing
    it('should return an error message when unable to create new listing', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the necessary dependencies
        const req = {
            body: {
                userId: '123',
                serviceName: 'Test Service',
                serviceDescription: 'Test Description',
                serviceCategory: 'Test Category',
                location: 'Test Location',
                rates: 'Test Rates',
                openTime: 'Test Open Time',
                closeTime: 'Test Close Time',
                experience: 'Test Experience',
                serviceImage: 'Test Image'
            }
        };
        const dbhelper = {
            execute: jest.fn().mockReturnValue({
                rowsAffected: [0]
            })
        };
        // Invoke the function
        yield (0, listings_controller_1.createListing)(req, res);
        // Assert that the error message is returned
        expect(res.json).toHaveBeenCalledWith({
            error: 'Unable to create new listing'
        });
    }));
});
describe('getAllListings', () => {
    let res;
    //define json for the responses in res.json return
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Returns a JSON object with a 'listings' property containing an array of listings.
    it('should return a JSON object with a \'listings\' property containing an array of listings when there are listings in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the execute method of dbhelper to return a recordset with listings
        dbHelper_1.default.prototype.execute = jest.fn().mockResolvedValue({ recordset: [{ id: '1', name: 'Listing 1' }, { id: '2', name: 'Listing 2' }] });
        // Call the getAllListings function
        const req = {};
        yield (0, listings_controller_1.getAllListings)(req, res);
        // Check that the json method is called with the correct response
        expect(res.json).toHaveBeenCalledWith({
            listings: [{ id: '1', name: 'Listing 1' }, { id: '2', name: 'Listing 2' }]
        });
    }));
    // Returns a JSON object with an empty array if there are no listings in the database.
    it('should return a JSON object with an empty array when there are no listings in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the execute method of dbhelper  to return an empty recordset
        dbHelper_1.default.prototype.execute = jest.fn().mockResolvedValue({ recordset: [] });
        // Call the getAllListings function
        const req = {};
        yield (0, listings_controller_1.getAllListings)(req, res);
        // Check that the json method is called with the correct response
        expect(res.json).toHaveBeenCalledWith({
            listings: []
        });
    }));
});
describe('getOneListing', () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Returns a JSON object with a listing when given a valid ID parameter.
    it('should return a JSON object with a listing when given a valid ID parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: 'validId'
            }
        };
        const executeMock = jest.fn().mockResolvedValue({ recordset: [{ id: '1', name: 'Listing 1' }] });
        yield (0, listings_controller_1.getOneListing)(req, res);
        expect(executeMock).toHaveBeenCalledWith('getOneListing', { serviceId: 'validId' });
        expect(res.json).toHaveBeenCalledWith({ listing: [{ id: 'validId', name: 'Listing 1' }] });
    }));
    // Returns a JSON object with an error message when an error occurs during the database query.
    it('should return a JSON object with an error message when an error occurs during the database query', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: 'invalidId'
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockRejectedValue({ originalError: { message: 'Database error' } });
        yield (0, listings_controller_1.getOneListing)(req, res);
        expect(executeMock).toHaveBeenCalledWith('getOneListing', { serviceId: 'invalidId' });
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    }));
});
describe('updateListing', () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // The function successfully updates a listing with valid input data.
    it('should update a listing with valid input data', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the necessary dependencies
        const req = {
            params: { id: '123' },
            body: {
                serviceName: 'Test Service',
                serviceDescription: 'Test Description',
                serviceCategory: 'Test Category',
                location: 'Test Location',
                rates: 'Test Rates',
                openTime: 'Test Open Time',
                closeTime: 'Test Close Time',
                experience: 'Test Experience',
                serviceImage: 'Test Image'
            }
        };
        // Call the function
        yield (0, listings_controller_1.updateListing)(req, res);
        // Assert that the response is correct
        expect(res.json).toHaveBeenCalledWith({
            message: "Listing updated successfully"
        });
    }));
    // The function updates a listing with the minimum valid input data.
    it('should update a listing with the minimum valid input data', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the necessary dependencies
        const req = {
            params: { id: '123' },
            body: {
                serviceName: 'Test Service'
            }
        };
        // Call the function
        yield (0, listings_controller_1.updateListing)(req, res);
        // Assert that the response is correct
        expect(res.json).toHaveBeenCalledWith({
            message: "Listing updated successfully"
        });
    }));
});
