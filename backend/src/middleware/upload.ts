import { mkdirSync } from "fs";
import { extname, join } from "path";
import multer from "multer";
import { AppError } from "../utils/app-error.js";
const uploadDirectory = join(process.cwd(), "uploads");
mkdirSync(uploadDirectory, { recursive: true });
const storage = multer.diskStorage({ destination: uploadDirectory, filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname).toLowerCase()}`) });
export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_req, file, cb) => cb(null, ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) });
export const uploadError = (error: unknown) => { if (error instanceof multer.MulterError) throw new AppError(400, error.code === "LIMIT_FILE_SIZE" ? "Photo must be 5 MB or smaller" : "Photo upload failed"); };
