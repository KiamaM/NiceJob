"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../Controllers/users.controller");
const verifyToken_1 = require("../Middlewares/verifyToken");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', users_controller_1.registerUser);
userRouter.get('/all-clients', verifyToken_1.verifyToken, users_controller_1.getAllClients);
userRouter.get('/client/:id', verifyToken_1.verifyToken, users_controller_1.getOneClient);
userRouter.delete('/client/delete/:id', verifyToken_1.verifyToken, users_controller_1.deleteClient);
userRouter.put('/client/update/:id', verifyToken_1.verifyToken, users_controller_1.updateClient);
userRouter.put('/reset-password', users_controller_1.resetPassword);
userRouter.get('/all-specialists', verifyToken_1.verifyToken, users_controller_1.getAllSpecialists);
userRouter.get('/specialist/:id', verifyToken_1.verifyToken, users_controller_1.getOneSpecialist);
userRouter.delete('/specialist/delete/:id', verifyToken_1.verifyToken, users_controller_1.deleteSpecialist);
userRouter.put('/specialist/update/:id', verifyToken_1.verifyToken, users_controller_1.updateSpecialist);
// userRouter.route('/all-clients').get(verifyToken, authorize('admin'), getAllClients)
exports.default = userRouter;
