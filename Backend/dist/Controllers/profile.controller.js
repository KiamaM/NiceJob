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
exports.getOneAppointment = exports.getAppointments = exports.reschedule = exports.cancelAppointment = exports.deleteProfile = exports.getOneProfile = exports.getProfilesBySpecialist = exports.getAllProfiles = exports.scheduleAppointment = void 0;
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const uuid_1 = require("uuid");
const dbhelper = new dbHelper_1.default;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        console.log(id);
        const { userId, listingId, appointmentDate } = req.body;
        let result = yield dbhelper.execute('scheduleAppointment', {
            profileId: id, userId, listingId, appointmentDate
        });
        if (result.rowsAffected[0] < 1) {
            return res.json({
                error: 'Error when scheduling appointment'
            });
        }
        else
            return res.json({
                message: 'You have successfully scheduled an appointment'
            });
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.scheduleAppointment = scheduleAppointment;
const getAllProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profiles = (yield dbhelper.execute('getAllProfiles')).recordset;
        return res.json({
            profiles: profiles
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.getAllProfiles = getAllProfiles;
const getProfilesBySpecialist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let profile = (yield dbhelper.execute('getProfilesBySpecialist', { userId: id })).recordset;
        return res.json({
            profile: profile
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.getProfilesBySpecialist = getProfilesBySpecialist;
const getOneProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let profile = (yield dbhelper.execute('getOneProfiles', { userId: id })).recordset;
        return res.json({
            profile: profile
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.getOneProfile = getOneProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = (yield dbhelper.execute('deleteProfile', { userId: id })).rowsAffected;
        return res.json({
            message: 'Profile deleted successfully'
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.deleteProfile = deleteProfile;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = (yield dbhelper.execute('cancelAppointment', { profileId: id })).rowsAffected;
        return res.json({
            message: 'Appointment cancelled successfully'
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.cancelAppointment = cancelAppointment;
const reschedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { appointmentDate } = req.body;
        const result = (yield dbhelper.execute('reschedule', {
            profileId: id, appointmentDate
        })).rowsAffected;
        console.log(result);
        return res.json({
            message: "You rescheduled successfully"
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.reschedule = reschedule;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let appointments = (yield dbhelper.execute('getAppointments', { userId: id })).recordset;
        console.log(appointments);
        return res.json({
            appointments
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.getAppointments = getAppointments;
const getOneAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let appointment = (yield dbhelper.execute('getOneAppointment', { profileId: id })).recordset;
        return res.json({
            appointment: appointment
        });
    }
    catch (error) {
        res.json({
            error: error.originalError.message
        });
    }
});
exports.getOneAppointment = getOneAppointment;
