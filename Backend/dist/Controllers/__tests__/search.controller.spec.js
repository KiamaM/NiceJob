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
const search_controller_1 = require("../search.controller");
describe('filterByCategory', () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    // The function successfully retrieves the service category from the request parameters.
    it('should retrieve the service category from the request parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the necessary dependencies
        const req = {
            params: { serviceCategory: 'Test Category' }
        };
        // Call the function
        yield (0, search_controller_1.filterByCategory)(req, res);
        // Assert that the response is correct
        expect(dbHelper_1.default.prototype.execute).toHaveBeenCalledWith('filterByCategory', { serviceCategory: 'Test Category' });
        expect(res.json).toContain({
            filterResults: []
        });
    }));
});
