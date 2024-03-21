"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../Controllers/search.controller");
const searchRouter = (0, express_1.Router)();
searchRouter.get('/:serviceCategory', search_controller_1.filterByCategory);
exports.default = searchRouter;
