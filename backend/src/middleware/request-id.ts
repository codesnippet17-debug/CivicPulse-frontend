import { RequestHandler } from "express";
import { randomUUID } from "crypto";
export const requestId: RequestHandler = (req, res, next) => { req.requestId = randomUUID(); res.setHeader("X-Request-Id", req.requestId); next(); };
