import Connection from '../../dbHelpers/dbHelper';
import { cancelAppointment, deleteProfile, getAllProfiles, getOneProfile, getProfilesBySpecialist, reschedule, scheduleAppointment } from '../profile.controller';

jest.mock('../../dbHelpers/dbHelper');



describe('scheduleAppointment', () => {
    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Function successfully schedules an appointment with valid input data
    it('should successfully schedule an appointment with valid input data', async () => {
        const req = {
            body: {
                userId: 'user123',
                listingId: 'listing123'
            }
        };

        const executeMock = jest.fn().mockResolvedValue({ rowsAffected: [1] });


        await scheduleAppointment(req as any, res);

        expect(executeMock).toHaveBeenCalledWith('scheduleAppointment', {
            profileId: expect.any(String),
            userId: 'user123',
            listingId: 'listing123'
        });
        expect(res.json).toHaveBeenCalledWith({
            message: 'You have successfully scheduled an appointment'
        });
    });

    // Function returns an error message when request body is empty
    it('should return an error message when request body is empty', async () => {
        const req = {
            body: {}
        };


        await scheduleAppointment(req as any, res);

        expect(res.json).toHaveBeenCalledWith({
            error: 'Error when scheduling appointment'
        });
    });
});



describe('getAllProfiles', () => {

    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Returns a JSON object with all profiles when the database query is successful
    it('should return a JSON object with all profiles when the database query is successful', async () => {
      const req = {};

      const executeMock = jest.fn().mockResolvedValue({ recordset: [{ name: 'John' }, { name: 'Jane' }] });


      await getAllProfiles(req as any, res);

      expect(executeMock).toHaveBeenCalledWith('getAllProfiles');
      expect(res.json).toHaveBeenCalledWith({ profiles: [{ name: 'John' }, { name: 'Jane' }] });
    });

    // Test with an empty database
    it('should return an empty JSON object when the database is empty', async () => {
      const req = {};

      const executeMock = jest.fn().mockResolvedValue({ recordset: [] });


      await getAllProfiles(req as any, res);

      expect(executeMock).toHaveBeenCalledWith('getAllProfiles');
      expect(res.json).toHaveBeenCalledWith({ profiles: [] });
    });
});







describe('getProfilesBySpecialist', () => {
    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Returns a JSON object with a 'profile' property containing an array of profiles when given a valid specialist ID.
    it('should return a JSON object with a \'profile\' property containing an array of profiles when given a valid specialist ID', async () => {
      // Mocking the request and response objects
      const req = {
        params: {
          id: 'validSpecialistID'
        }
      };


      // Mocking the execute method of dbhelper
      (Connection.prototype.execute as jest.Mock).mockResolvedValue({ recordset: [{ profile: 'profile1' }, { profile: 'profile2' }] });


      // Calling the function
      await getProfilesBySpecialist(req as any, res);

      // Assertion
      expect(res.json).toHaveBeenCalledWith({
        profile: [{ profile: 'profile1' }, { profile: 'profile2' }]
      });
    });

    // Returns a JSON object with an 'error' property containing the error message when an error occurs during database query execution.
    it('should return a JSON object with an \'error\' property containing the error message when an error occurs during database query execution', async () => {
      // Mocking the request and response objects
      const req = {
        params: {
          id: 'validSpecialistID'
        }
      };


      // Mocking the execute method of dbhelper to throw an error
      (Connection.prototype.execute as jest.Mock).mockRejectedValue({ originalError: { message: 'Database query error' } });


      // Calling the function
      await getProfilesBySpecialist(req as any, res);

      // Assertion
      expect(res.json).toHaveBeenCalledWith({
        error: 'Database query error'
      });
    });
});





describe('getOneProfile', () => {

    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Function successfully retrieves a profile with a valid ID
    it('should retrieve a profile with a valid ID', async () => {
        const req = {
            params: {
                id: 'validID'
            }
        };

        const executeMock = jest.fn().mockResolvedValue({ recordset: [{ id: 'validID', name: 'John Doe' }] });


        await getOneProfile(req as any, res);

        expect(executeMock).toHaveBeenCalledWith('getOneProfile', { serviceId: 'validID' });
        expect(res.json).toHaveBeenCalledWith({ profile: [{ id: 'validID', name: 'John Doe' }] });
    });

    // ID parameter is null or undefined
    it('should return an error when ID parameter is null or undefined', async () => {
        const req = {
            params: {
                id: null
            }
        };

        const executeMock = (Connection.prototype.execute as jest.Mock)

        await getOneProfile(req as any, res);

        expect(executeMock).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ error: 'Cannot read property \'message\' of undefined' });
    });
});



describe('deleteProfile', () => {

    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Function successfully deletes a profile with a valid id parameter
    it('should delete profile when valid id parameter is provided', async () => {
      // Mock the necessary dependencies
      const req = {
        params: {
          id: 'validId'
        }
      };

      // Mock the execute method of dbhelper to return a successful result
      (Connection.prototype.execute as jest.Mock).mockResolvedValue({ rowsAffected: 1 });


      // Call the deleteProfile function
      await deleteProfile(req as any, res);

      // Check that the execute method was called with the correct parameters
      expect(Connection.prototype.execute as jest.Mock).toHaveBeenCalledWith('deleteProfile', { userId: 'validId' });


      // Check that the response was sent with the correct message
      expect(res.json).toHaveBeenCalledWith({ message: 'Profile deleted successfully' });
    });

    // Attempting to delete a profile with an invalid id parameter returns an error response
    it('should return error response when invalid id parameter is provided', async () => {
      // Mock the necessary dependencies
      const req = {
        params: {
          id: 'invalidId'
        }
      };


      // Mock the execute method of dbhelper to throw an error
      (Connection.prototype.execute as jest.Mock).mockRejectedValue({ originalError: { message: 'Invalid id' } });


      // Call the deleteProfile function
      await deleteProfile(req as any, res);

      // Check that the execute method was called with the correct parameters
      expect(Connection.prototype.execute as jest.Mock).toHaveBeenCalledWith('deleteProfile', { userId: 'invalidId' });

      // Check that the response was sent with the correct error message
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid id' });
    });
});




describe('cancelAppointment', () => {

    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })


    // The function cancels an appointment successfully when given a valid profile ID.
    it('should cancel appointment successfully when given a valid profile ID', async () => {
      // Mock the necessary dependencies
      const req = {
        params: {
          id: 'validProfileId'
        }
      };

      // Mock the execute method of dbhelper to return a successful result
      (Connection.prototype.execute as jest.Mock).mockResolvedValue({ rowsAffected: 1 });


      // Call the cancelAppointment function
      await cancelAppointment(req as any, res);

      // Check if the execute method of dbhelper is called with the correct arguments
      expect(Connection.prototype.execute as jest.Mock).toHaveBeenCalledWith('cancelAppointment', { profileId: 'validProfileId' });

      // Check if the json method of res is called with the correct response
      expect(res.json).toHaveBeenCalledWith({
        message: 'Appointment cancelled successfully'
      });
    });

    // The function returns a JSON response with an error message when given an invalid profile ID.
    it('should return JSON response with an error message when given an invalid profile ID', async () => {
      // Mock the necessary dependencies
      const req = {
        params: {
          id: 'invalidProfileId'
        }
      };


      // Mock the execute method of dbhelper to throw an error
      (Connection.prototype.execute as jest.Mock).mockRejectedValue({ originalError: { message: 'Invalid profile ID' } });


      // Call the cancelAppointment function
      await cancelAppointment(req as any, res);

      // Check if the execute method of dbhelper is called with the correct arguments
      expect(Connection.prototype.execute as jest.Mock).toHaveBeenCalledWith('cancelAppointment', { profileId: 'invalidProfileId' });

      // Check if the json method of res is called with the correct response
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid profile ID'
      });
    });
});


describe('reschedule', () => {

    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })


    // Successfully reschedules an appointment with valid input
    it('should successfully reschedule an appointment with valid input', async () => {
        const req = {
            params: {
                id: 'validId'
            },
            body: {
                appointmentDate: 'validDate'
            }
        };



        const executeMock = (Connection.prototype.execute as jest.Mock).mockResolvedValue({ rowsAffected: 1 });

        await reschedule(req as any, res);

        expect(executeMock).toHaveBeenCalledWith('reschedule', { profileId: 'validId', appointmentDate: 'validDate' });
        expect(res.json).toHaveBeenCalledWith({ message: "You rescheduled successfully" });
    });

    // Fails to reschedule with invalid profileId
    it('should fail to reschedule with invalid profileId', async () => {
        const req = {
            params: {
                id: 'invalidId'
            },
            body: {
                appointmentDate: 'validDate'
            }
        };



        const executeMock = (Connection.prototype.execute as jest.Mock).mockResolvedValue({ rowsAffected: 0 });

        await reschedule(req as any, res);

        expect(executeMock).toHaveBeenCalledWith('reschedule', { profileId: 'invalidId', appointmentDate: 'validDate' });
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid profileId" });
    });

    // Fails to reschedule with invalid appointmentDate
    it('should fail to reschedule with invalid appointmentDate', async () => {
        const req = {
            params: {
                id: 'validId'
            },
            body: {
                appointmentDate: ''
            }
        };



        const executeMock = (Connection.prototype.execute as jest.Mock).mockResolvedValue({ rowsAffected: 0 });

        await reschedule(req as any, res);

        expect(executeMock).toHaveBeenCalledWith('reschedule', { profileId: 'validId', appointmentDate: '' });
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid appointmentDate" });
    });
});








