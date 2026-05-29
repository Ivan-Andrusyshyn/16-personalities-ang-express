"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getGoogleDriveFile_controller_1 = __importDefault(require("../controllers/google/google-drive/getGoogleDriveFile.controller"));
const googleDrive = (0, express_1.default)();
googleDrive.get('/tests/16-personalities/results', getGoogleDriveFile_controller_1.default);
exports.default = googleDrive;
