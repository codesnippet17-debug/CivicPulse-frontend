import { Router } from "express";
import { uploadPhoto } from "../controllers/upload.controller.js";
import { upload } from "../middleware/upload.js";
import { asyncHandler } from "../utils/async-handler.js";
const router = Router();
router.post("/", upload.single("photo"), asyncHandler(uploadPhoto));
export default router;
