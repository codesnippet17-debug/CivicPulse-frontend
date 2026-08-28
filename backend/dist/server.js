"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const env_js_1 = require("./config/env.js");
const prisma_js_1 = require("./lib/prisma.js");
const server = app_js_1.app.listen(env_js_1.env.port, () => console.log(`CivicPulse API listening on http://localhost:${env_js_1.env.port}`));
const shutdown = async () => { server.close(); await prisma_js_1.prisma.$disconnect(); process.exit(0); };
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
