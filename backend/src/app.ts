import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/error-handler.js";
import { requestId } from "./middleware/request-id.js";
import issueRoutes from "./routes/issue.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

export const app = express();
app.use(requestId); app.use(helmet()); app.use(cors({ origin: env.frontendUrl, methods: ["GET", "POST", "PATCH"], allowedHeaders: ["Content-Type", "Authorization"] })); app.use(express.json({ limit: "8mb" })); app.use(morgan(":method :url :status :response-time ms"));
app.get("/health", (_req, res) => res.json({ status: "ok", service: "civicpulse-api", timestamp: new Date().toISOString() }));
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/uploads", uploadRoutes); app.use("/api/v1/issues", issueRoutes); app.use(notFound); app.use(errorHandler);
