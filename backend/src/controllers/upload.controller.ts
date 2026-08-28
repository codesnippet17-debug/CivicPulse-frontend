import { RequestHandler } from "express";
import { AppError } from "../utils/app-error.js";
export const uploadPhoto: RequestHandler = (req, res) => {
  if (!req.file) throw new AppError(400, "A photo file is required");
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  res.status(201).json({ data: { url: `${baseUrl}/uploads/${req.file.filename}`, filename: req.file.filename, mimeType: req.file.mimetype, size: req.file.size } });
};
