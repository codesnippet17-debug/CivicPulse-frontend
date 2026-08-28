"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_js_1 = require("../controllers/upload.controller.js");
const upload_js_1 = require("../middleware/upload.js");
const async_handler_js_1 = require("../utils/async-handler.js");
const router = (0, express_1.Router)();
router.post("/", upload_js_1.upload.single("photo"), (0, async_handler_js_1.asyncHandler)(upload_controller_js_1.uploadPhoto));
exports.default = router;
