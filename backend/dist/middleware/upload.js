"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadError = exports.upload = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const multer_1 = __importDefault(require("multer"));
const app_error_js_1 = require("../utils/app-error.js");
const uploadDirectory = (0, path_1.join)(process.cwd(), "uploads");
(0, fs_1.mkdirSync)(uploadDirectory, { recursive: true });
const storage = multer_1.default.diskStorage({ destination: uploadDirectory, filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${(0, path_1.extname)(file.originalname).toLowerCase()}`) });
exports.upload = (0, multer_1.default)({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_req, file, cb) => cb(null, ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) });
const uploadError = (error) => { if (error instanceof multer_1.default.MulterError)
    throw new app_error_js_1.AppError(400, error.code === "LIMIT_FILE_SIZE" ? "Photo must be 5 MB or smaller" : "Photo upload failed"); };
exports.uploadError = uploadError;
