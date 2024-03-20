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
exports.updateListing = exports.deleteListing = exports.getOneListing = exports.getAllListings = exports.createListing = void 0;
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const uuid_1 = require("uuid");
const dbhelper = new dbHelper_1.default;
const createListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        console.log(id);
        const { serviceName, serviceDescription, serviceCategory, location, rates, openTime, closeTime, experience, serviceImage } = req.body;
        let result = yield dbhelper.execute('createListing', {
            serviceId: id, serviceName, serviceDescription, serviceCategory, location, rates, openTime, closeTime, experience, serviceImage
        });
        if (result.rowsAffected[0] < 1) {
            return res.json({
                error: 'Unable to create new listing'
            });
        }
        else
            return res.json({
                message: 'Listing created successfully'
            });
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.createListing = createListing;
//  PRODUCT CONTROLLERS
const getAllListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let listings = (yield dbhelper.execute('getALLLIstings')).recordset;
        return res.json({
            listings: listings
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.getAllListings = getAllListings;
const getOneListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let listing = (yield dbhelper.execute('getOneListing', { serviceId: id })).recordset;
        console.log(listing);
        return res.json({
            listing
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.getOneListing = getOneListing;
const deleteListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = (yield dbhelper.execute('deleteListing', { serviceId: id })).rowsAffected;
        return res.json({
            message: 'Listing deleted successfully'
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.deleteListing = deleteListing;
const updateListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { serviceName, serviceDescription, serviceCategory, location, rates, openTime, closeTime, experience, serviceImage } = req.body;
        const result = (yield dbhelper.execute('updateListing', {
            serviceId: id, serviceName, serviceDescription, serviceCategory, location, rates, openTime, closeTime, experience, serviceImage
        })).rowsAffected;
        console.log(result);
        return res.json({
            message: "Listing updated successfully"
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.updateListing = updateListing;
