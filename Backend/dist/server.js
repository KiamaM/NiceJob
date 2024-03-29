"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./Router/user.router"));
const auth_router_1 = __importDefault(require("./Router/auth.router"));
const listings_router_1 = __importDefault(require("./Router/listings.router"));
const profiles_router_1 = __importDefault(require("./Router/profiles.router"));
const appointments_router_1 = __importDefault(require("./Router/appointments.router"));
const search_router_1 = __importDefault(require("./Router/search.router"));
const reviews_router_1 = __importDefault(require("./Router/reviews.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use('/users', user_router_1.default);
app.use('/auth', auth_router_1.default);
app.use('/listings', listings_router_1.default);
app.use('/profiles', profiles_router_1.default);
app.use('/appointments', appointments_router_1.default);
app.use('/filter', search_router_1.default);
app.use('/reviews', reviews_router_1.default);
app.use((err, req, res, next) => {
    res.json({
        message: err.message
    });
});
let port = 4500;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
