"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const required = (name, fallback) => {
    const value = process.env[name] ?? fallback;
    if (!value)
        throw new Error(`Missing required environment variable: ${name}`);
    return value;
};
exports.env = {
    port: Number(process.env.PORT ?? 4000),
    databaseUrl: required("DATABASE_URL"),
    frontendUrl: required("FRONTEND_URL", "http://localhost:3000"),
};
