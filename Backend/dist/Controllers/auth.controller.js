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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.checkUserDetails = exports.loginUser = void 0;
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const user_validator_1 = require("../Validators/user.validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbHelper = new dbHelper_1.default;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { email, password } = req.body;
        console.log(req.body);
        let { error } = user_validator_1.loginUserValidation.validate(req.body);
        console.log(error);
        if (error) {
            return res.json({
                error: error.details[0].message
            });
        }
        let user = (yield dbHelper.execute('login', {
            email
        })).recordset;
        console.log(user);
        console.log((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email);
        if (((_b = user[0]) === null || _b === void 0 ? void 0 : _b.email) == email) {
            const correct_pwd = yield bcrypt_1.default.compare(password, user[0].password);
            console.log(password);
            console.log(user[0].password);
            if (!correct_pwd) {
                return res.json({
                    error: "Incorrect password"
                });
            }
            else {
                const loginCredentials = user.map((response) => {
                    const { registerDate, isDeleted, isWelcomed, password } = response, rest = __rest(response, ["registerDate", "isDeleted", "isWelcomed", "password"]);
                    console.log(response);
                    return rest;
                });
                console.log(process.env.SECRET);
                const token = jsonwebtoken_1.default.sign(loginCredentials[0], process.env['SECRET'], {
                    expiresIn: '3d'
                });
                console.log(token);
                return res.json({
                    message: 'Login Success',
                    token
                });
            }
        }
        else {
            return res.json({
                error: 'User not found'
            });
        }
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.loginUser = loginUser;
const checkUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        console.log(req.info);
        return res.json({
            info: req.info
        });
    }
});
exports.checkUserDetails = checkUserDetails;
const authorize = (...role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.info) {
            // console.log(req);
            console.log(req.info.role);
            if (!role.includes(req.info.role)) {
                console.log('No permission');
                return res.json({
                    error: 'You do not have permission to perform this action',
                });
            }
            console.log('Permission granted');
            next();
        }
    });
};
exports.authorize = authorize;
