"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sqlConfig = {
    user: ((_a = process.env) === null || _a === void 0 ? void 0 : _a['DB_USER']) || 'sa',
    password: ((_b = process.env) === null || _b === void 0 ? void 0 : _b['DB_PWD']) || 'Haha',
    database: ((_c = process.env) === null || _c === void 0 ? void 0 : _c['DB_NAME']) || 'StriveCraft',
    server: ((_d = process.env) === null || _d === void 0 ? void 0 : _d['SERVER']) || 'DESKTOP-A58QF1P\\KIAMA',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};
console.log(exports.sqlConfig);
