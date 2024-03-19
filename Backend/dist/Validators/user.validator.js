"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidation = exports.registerUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserValidation = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    role: joi_1.default.string(),
    email: joi_1.default.string().required().email({
        minDomainSegments: 2, tlds: {
            allow: ['com', 'ke']
        }
    }).message('The email format is invalid.'),
    password: joi_1.default.string().required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>\\/\\\\]{8,30}$'))
        .message('Password must be 8-30 characters and must contain a special character.')
});
exports.loginUserValidation = joi_1.default.object({
    email: joi_1.default.string().required().email({
        minDomainSegments: 2, tlds: {
            allow: ['com', 'ke']
        }
    }).message('The email format is invalid.'),
    password: joi_1.default.string().required()
});
