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
const profile_controller_1 = require("../profile.controller");
jest.mock('../../dbHelpers/dbHelper');
describe('scheduleAppointment', () => {
    let res;
    //define json for the responses in res.json return
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Function successfully schedules an appointment with valid input data
    it('should successfully schedule an appointment with valid input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                userId: 'user123',
                listingId: 'listing123'
            }
        };
        const executeMock = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        yield (0, profile_controller_1.scheduleAppointment)(req, res);
        expect(executeMock).toHaveBeenCalledWith('scheduleAppointment', {
            profileId: expect.any(String),
            userId: 'user123',
            listingId: 'listing123'
        });
        expect(res.json).toHaveBeenCalledWith({
            message: 'You have successfully scheduled an appointment'
        });
    }));
    // Function returns an error message when request body is empty
    it('should return an error message when request body is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {}
        };
        yield (0, profile_controller_1.scheduleAppointment)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Error when scheduling appointment'
        });
    }));
});
describe('getAllProfiles', () => {
    let res;
    //define json for the responses in res.json return
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Returns a JSON object with all profiles when the database query is successful
    it('should return a JSON object with all profiles when the database query is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {};
        const executeMock = jest.fn().mockResolvedValue({ recordset: [{ name: 'John' }, { name: 'Jane' }] });
        yield (0, profile_controller_1.getAllProfiles)(req, res);
        expect(executeMock).toHaveBeenCalledWith('getAllProfiles');
        expect(res.json).toHaveBeenCalledWith({ profiles: [{ name: 'John' }, { name: 'Jane' }] });
    }));
    // Test with an empty database
    it('should return an empty JSON object when the database is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {};
        const executeMock = jest.fn().mockResolvedValue({ recordset: [] });
        yield (0, profile_controller_1.getAllProfiles)(req, res);
        expect(executeMock).toHaveBeenCalledWith('getAllProfiles');
        expect(res.json).toHaveBeenCalledWith({ profiles: [] });
    }));
});
describe('getProfilesBySpecialist', () => {
    let res;
    //define json for the responses in res.json return
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Returns a JSON object with a 'profile' property containing an array of profiles when given a valid specialist ID.
    it('should return a JSON object with a \'profile\' property containing an array of profiles when given a valid specialist ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the request and response objects
        const req = {
            params: {
                id: 'validSpecialistID'
            }
        };
        // Mocking the execute method of dbhelper
        dbHelper_1.default.prototype.execute.mockResolvedValue({ recordset: [{ profile: 'profile1' }, { profile: 'profile2' }] });
        // Calling the function
        yield (0, profile_controller_1.getProfilesBySpecialist)(req, res);
        // Assertion
        expect(res.json).toHaveBeenCalledWith({
            profile: [{ profile: 'profile1' }, { profile: 'profile2' }]
        });
    }));
    // Returns a JSON object with an 'error' property containing the error message when an error occurs during database query execution.
    it('should return a JSON object with an \'error\' property containing the error message when an error occurs during database query execution', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the request and response objects
        const req = {
            params: {
                id: 'validSpecialistID'
            }
        };
        // Mocking the execute method of dbhelper to throw an error
        dbHelper_1.default.prototype.execute.mockRejectedValue({ originalError: { message: 'Database query error' } });
        // Calling the function
        yield (0, profile_controller_1.getProfilesBySpecialist)(req, res);
        // Assertion
        expect(res.json).toHaveBeenCalledWith({
            error: 'Database query error'
        });
    }));
});
describe('getOneProfile', () => {
    let res;
    //define json for the responses in res.json return
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Function successfully retrieves a profile with a valid ID
    it('should retrieve a profile with a valid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: 'validID'
            }
        };
        const executeMock = jest.fn().mockResolvedValue({ recordset: [{ id: 'validID', name: 'John Doe' }] });
        yield (0, profile_controller_1.getOneProfile)(req, res);
        expect(executeMock).toHaveBeenCalledWith('getOneProfile', { serviceId: 'validID' });
        expect(res.json).toHaveBeenCalledWith({ profile: [{ id: 'validID', name: 'John Doe' }] });
    }));
    // ID parameter is null or undefined
    it('should return an error when ID parameter is null or undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: null
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute;
        yield (0, profile_controller_1.getOneProfile)(req, res);
        expect(executeMock).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ error: 'Cannot read property \'message\' of undefined' });
    }));
});
describe('deleteProfile', () => {
    let res;
    //define json for the responses in res.json return
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Function successfully deletes a profile with a valid id parameter
    it('should delete profile when valid id parameter is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the necessary dependencies
        const req = {
            params: {
                id: 'validId'
            }
        };
        // Mock the execute method of dbhelper to return a successful result
        dbHelper_1.default.prototype.execute.mockResolvedValue({ rowsAffected: 1 });
        // Call the deleteProfile function
        yield (0, profile_controller_1.deleteProfile)(req, res);
        // Check that the execute method was called with the correct parameters
        expect(dbHelper_1.default.prototype.execute).toHaveBeenCalledWith('deleteProfile', { userId: 'validId' });
        // Check that the response was sent with the correct message
        expect(res.json).toHaveBeenCalledWith({ message: 'Profile deleted successfully' });
    }));
    // Attempting to delete a profile with an invalid id parameter returns an error response
    it('should return error response when invalid id parameter is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the necessary dependencies
        const req = {
            params: {
                id: 'invalidId'
            }
        };
        // Mock the execute method of dbhelper to throw an error
        dbHelper_1.default.prototype.execute.mockRejectedValue({ originalError: { message: 'Invalid id' } });
        // Call the deleteProfile function
        yield (0, profile_controller_1.deleteProfile)(req, res);
        // Check that the execute method was called with the correct parameters
        expect(dbHelper_1.default.prototype.execute).toHaveBeenCalledWith('deleteProfile', { userId: 'invalidId' });
        // Check that the response was sent with the correct error message
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid id' });
    }));
});
describe('cancelAppointment', () => {
    let res;
    //define json for the responses in res.json return
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // The function cancels an appointment successfully when given a valid profile ID.
    it('should cancel appointment successfully when given a valid profile ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the necessary dependencies
        const req = {
            params: {
                id: 'validProfileId'
            }
        };
        // Mock the execute method of dbhelper to return a successful result
        dbHelper_1.default.prototype.execute.mockResolvedValue({ rowsAffected: 1 });
        // Call the cancelAppointment function
        yield (0, profile_controller_1.cancelAppointment)(req, res);
        // Check if the execute method of dbhelper is called with the correct arguments
        expect(dbHelper_1.default.prototype.execute).toHaveBeenCalledWith('cancelAppointment', { profileId: 'validProfileId' });
        // Check if the json method of res is called with the correct response
        expect(res.json).toHaveBeenCalledWith({
            message: 'Appointment cancelled successfully'
        });
    }));
    // The function returns a JSON response with an error message when given an invalid profile ID.
    it('should return JSON response with an error message when given an invalid profile ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the necessary dependencies
        const req = {
            params: {
                id: 'invalidProfileId'
            }
        };
        // Mock the execute method of dbhelper to throw an error
        dbHelper_1.default.prototype.execute.mockRejectedValue({ originalError: { message: 'Invalid profile ID' } });
        // Call the cancelAppointment function
        yield (0, profile_controller_1.cancelAppointment)(req, res);
        // Check if the execute method of dbhelper is called with the correct arguments
        expect(dbHelper_1.default.prototype.execute).toHaveBeenCalledWith('cancelAppointment', { profileId: 'invalidProfileId' });
        // Check if the json method of res is called with the correct response
        expect(res.json).toHaveBeenCalledWith({
            error: 'Invalid profile ID'
        });
    }));
});
describe('reschedule', () => {
    let res;
    //define json for the responses in res.json return
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // Successfully reschedules an appointment with valid input
    it('should successfully reschedule an appointment with valid input', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: 'validId'
            },
            body: {
                appointmentDate: 'validDate'
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockResolvedValue({ rowsAffected: 1 });
        yield (0, profile_controller_1.reschedule)(req, res);
        expect(executeMock).toHaveBeenCalledWith('reschedule', { profileId: 'validId', appointmentDate: 'validDate' });
        expect(res.json).toHaveBeenCalledWith({ message: "You rescheduled successfully" });
    }));
    // Fails to reschedule with invalid profileId
    it('should fail to reschedule with invalid profileId', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: 'invalidId'
            },
            body: {
                appointmentDate: 'validDate'
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockResolvedValue({ rowsAffected: 0 });
        yield (0, profile_controller_1.reschedule)(req, res);
        expect(executeMock).toHaveBeenCalledWith('reschedule', { profileId: 'invalidId', appointmentDate: 'validDate' });
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid profileId" });
    }));
    // Fails to reschedule with invalid appointmentDate
    it('should fail to reschedule with invalid appointmentDate', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: 'validId'
            },
            body: {
                appointmentDate: ''
            }
        };
        const executeMock = dbHelper_1.default.prototype.execute.mockResolvedValue({ rowsAffected: 0 });
        yield (0, profile_controller_1.reschedule)(req, res);
        expect(executeMock).toHaveBeenCalledWith('reschedule', { profileId: 'validId', appointmentDate: '' });
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid appointmentDate" });
    }));
});
