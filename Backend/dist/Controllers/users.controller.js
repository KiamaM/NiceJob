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
exports.registerUser = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const dbhelper = new dbHelper_1.default;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        console.log(id);
        const { firstName, lastName, role, email, password } = req.body;
        const hashedPwd = yield bcrypt_1.default.hash(password, 5);
        console.log(hashedPwd);
        let result = yield dbhelper.execute('registerUser', {
            userId: id, firstName, lastName, role, email, hashedPwd
        });
        if (result.rowsAffected[0] < 1) {
            return res.json({
                error: 'Account creation failed'
            });
        }
        else
            return res.json({
                message: 'Account created successfully'
            });
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.registerUser = registerUser;