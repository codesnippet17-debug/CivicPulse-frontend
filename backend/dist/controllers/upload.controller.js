"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPhoto = void 0;
const app_error_js_1 = require("../utils/app-error.js");
const uploadPhoto = (req, res) => {
    if (!req.file)
        throw new app_error_js_1.AppError(400, "A photo file is required");
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.status(201).json({ data: { url: `${baseUrl}/uploads/${req.file.filename}`, filename: req.file.filename, mimeType: req.file.mimetype, size: req.file.size } });
};
exports.uploadPhoto = uploadPhoto;
