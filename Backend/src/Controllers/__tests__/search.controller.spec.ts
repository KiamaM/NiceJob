import Connection from "../../dbHelpers/dbHelper";
import { filterByCategory } from "../search.controller";

describe('filterByCategory', () => {

    let res:any


    beforeEach(()=>{
        res = {
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    // The function successfully retrieves the service category from the request parameters.
    it('should retrieve the service category from the request parameters', async () => {
      // Mock the necessary dependencies
      const req = {
          params: { serviceCategory: 'Test Category' }
      };

      // Call the function
      await filterByCategory(req as any, res);

      // Assert that the response is correct
      expect(Connection.prototype.execute as jest.Mock).toHaveBeenCalledWith('filterByCategory', { serviceCategory: 'Test Category' });
      expect(res.json).toContain({
          filterResults: []
      });
    });
});
