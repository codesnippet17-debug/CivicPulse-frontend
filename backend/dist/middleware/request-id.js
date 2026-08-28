"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestId = void 0;
const crypto_1 = require("crypto");
const requestId = (req, res, next) => { req.requestId = (0, crypto_1.randomUUID)(); res.setHeader("X-Request-Id", req.requestId); next(); };
exports.requestId = requestId;
