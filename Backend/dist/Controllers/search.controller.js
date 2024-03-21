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
exports.filterByCategory = void 0;
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const dbhelper = new dbHelper_1.default;
const filterByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceCategory = req.params.serviceCategory;
        let filterResults = (yield dbhelper.execute('filterByCategory', { serviceCategory })).recordset;
        return res.json({
            filterResults: filterResults
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.filterByCategory = filterByCategory;
