import Connection from "../../dbHelpers/dbHelper";
import { createListing, getAllListings, getOneListing, updateListing } from "../listings.controller";



describe('createListing', () => {


    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })
    // Function successfully creates a new listing when valid input is provided
    it('should create a new listing when valid input is provided', async () => {
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
      await createListing(req as any, res);

      // Assert that the listing was created successfully
      expect(res.json).toHaveBeenCalledWith({
        message: 'Listing created successfully'
      });
    });

    // Function returns an error message when unable to create new listing
    it('should return an error message when unable to create new listing', async () => {
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
      await createListing(req as any, res);

      // Assert that the error message is returned
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to create new listing'
      });
    });
});




describe('getAllListings', () => {

    let res:any

    //define json for the responses in res.json return
    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Returns a JSON object with a 'listings' property containing an array of listings.
    it('should return a JSON object with a \'listings\' property containing an array of listings when there are listings in the database', async () => {
        // Mock the execute method of dbhelper to return a recordset with listings
        (Connection.prototype.execute as jest.Mock) = jest.fn().mockResolvedValue({ recordset: [{ id: '1', name: 'Listing 1' }, { id: '2', name: 'Listing 2' }] });

        // Call the getAllListings function
        const req = {};

        await getAllListings(req as any, res);

        // Check that the json method is called with the correct response
        expect(res.json).toHaveBeenCalledWith({
            listings: [{ id: '1', name: 'Listing 1' }, { id: '2', name: 'Listing 2' }]
        });
    });

    // Returns a JSON object with an empty array if there are no listings in the database.
    it('should return a JSON object with an empty array when there are no listings in the database', async () => {
        // Mock the execute method of dbhelper  to return an empty recordset
        (Connection.prototype.execute as jest.Mock) = jest.fn().mockResolvedValue({ recordset: [] });

        // Call the getAllListings function
        const req = {};

        await getAllListings(req as any, res);

        // Check that the json method is called with the correct response
        expect(res.json).toHaveBeenCalledWith({
            listings: []
        });
    });
});



describe('getOneListing', () => {
    let res:any


    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // Returns a JSON object with a listing when given a valid ID parameter.
    it('should return a JSON object with a listing when given a valid ID parameter', async () => {
        const req = {
            params: {
                id: 'validId'
            }
        };

        const executeMock = jest.fn().mockResolvedValue({ recordset: [{ id: '1', name: 'Listing 1' }] });


        await getOneListing(req as any, res);

        expect(executeMock).toHaveBeenCalledWith('getOneListing', { serviceId: 'validId' });
        expect(res.json).toHaveBeenCalledWith({ listing: [{ id: 'validId', name: 'Listing 1' }] });
    });

    // Returns a JSON object with an error message when an error occurs during the database query.
    it('should return a JSON object with an error message when an error occurs during the database query', async () => {
        const req = {
            params: {
                id: 'invalidId'
            }
        };

        const executeMock = (Connection.prototype.execute as jest.Mock).mockRejectedValue({ originalError: { message: 'Database error' } });

        await getOneListing(req as any, res);

        expect(executeMock).toHaveBeenCalledWith('getOneListing', { serviceId: 'invalidId' });
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
});




describe('updateListing', () => {
    let res:any


    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })


    // The function successfully updates a listing with valid input data.
    it('should update a listing with valid input data', async () => {
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
        await updateListing(req as any, res);

        // Assert that the response is correct
        expect(res.json).toHaveBeenCalledWith({
            message: "Listing updated successfully"
        });
    });

    // The function updates a listing with the minimum valid input data.
    it('should update a listing with the minimum valid input data', async () => {
        // Mock the necessary dependencies
        const req = {
            params: { id: '123' },
            body: {
                serviceName: 'Test Service'
            }
        };


        // Call the function
        await updateListing(req as any, res);

        // Assert that the response is correct
        expect(res.json).toHaveBeenCalledWith({
            message: "Listing updated successfully"
        });
    });
});



