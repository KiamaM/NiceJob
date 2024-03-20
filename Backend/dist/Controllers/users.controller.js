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
exports.updateSpecialist = exports.deleteSpecialist = exports.getOneSpecialist = exports.getAllSpecialists = exports.updateClient = exports.deleteClient = exports.getOneClient = exports.getAllClients = exports.registerUser = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const user_validator_1 = require("../Validators/user.validator");
const dbhelper = new dbHelper_1.default;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        console.log(id);
        const { firstName, lastName, role, email, password } = req.body;
        let { error } = user_validator_1.registerUserValidation.validate(req.body);
        if (error) {
            return res.json({
                error: error.details[0].message
            });
        }
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
//  CLIENT CONTROLLERS
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let clients = (yield dbhelper.execute('getAllClients')).recordset;
        return res.json({
            clients: clients
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.getAllClients = getAllClients;
const getOneClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let user = (yield dbhelper.execute('getOneClient', { userId: id })).recordset;
        console.log(user);
        return res.json({
            user
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.getOneClient = getOneClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = (yield dbhelper.execute('deleteClient', { userId: id })).rowsAffected;
        return res.json({
            message: 'Account deactivated successfully'
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.deleteClient = deleteClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { firstName, lastName, role, email } = req.body;
        const result = (yield dbhelper.execute('updateClient', {
            userId: id,
            firstName: firstName,
            lastName: lastName,
            email: email
        })).rowsAffected;
        console.log(result);
        return res.json({
            message: "Profile updated successfully"
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.updateClient = updateClient;
//    SPECIALIST CONTROLLERS
const getAllSpecialists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let specialists = (yield dbhelper.execute('getAllSpecialists')).recordset;
        return res.json({
            specialists: specialists
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.getAllSpecialists = getAllSpecialists;
const getOneSpecialist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let specialist = (yield dbhelper.execute('getOneSpecialist', { userId: id })).recordset;
        console.log(specialist);
        return res.json({
            specialist
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.getOneSpecialist = getOneSpecialist;
const deleteSpecialist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = (yield dbhelper.execute('deleteSpecialist', { userId: id })).rowsAffected;
        return res.json({
            message: 'Account deactivated successfully'
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.deleteSpecialist = deleteSpecialist;
const updateSpecialist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { firstName, lastName, role, email } = req.body;
        const result = (yield dbhelper.execute('updateSpecialist', {
            userId: id,
            firstName: firstName,
            lastName: lastName,
            email: email
        })).rowsAffected;
        console.log(result);
        return res.json({
            message: "Profile updated successfully"
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.updateSpecialist = updateSpecialist;
