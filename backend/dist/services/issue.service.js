"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueService = exports.IssueService = void 0;
const prisma_js_1 = require("../lib/prisma.js");
const app_error_js_1 = require("../utils/app-error.js");
const ai_service_js_1 = require("./ai.service.js");
const include = { statusEvents: { orderBy: { createdAt: "asc" } }, resolution: true, _count: { select: { reports: true } } };
class IssueService {
    async list(filters) { const where = { ...(filters.category && { category: filters.category }), ...(filters.status && { status: filters.status }), ...(filters.minSeverity !== undefined && { severity: { gte: filters.minSeverity } }) }; const [issues, total] = await prisma_js_1.prisma.$transaction([prisma_js_1.prisma.issue.findMany({ where, orderBy: [{ priority: "desc" }, { createdAt: "desc" }], skip: (filters.page - 1) * filters.limit, take: filters.limit, include }), prisma_js_1.prisma.issue.count({ where })]); return { issues, meta: { total, page: filters.page, limit: filters.limit, totalPages: Math.ceil(total / filters.limit) } }; }
    async get(publicId) { const issue = await prisma_js_1.prisma.issue.findUnique({ where: { publicId }, include }); if (!issue)
        throw new app_error_js_1.AppError(404, "Civic issue not found"); return issue; }
    async create(input) { const category = input.category; const analysis = (0, ai_service_js_1.estimateIssue)(category); const total = await prisma_js_1.prisma.issue.count(); const publicId = `CIV-${String(1001 + total).padStart(4, "0")}`; return prisma_js_1.prisma.issue.create({ data: { publicId, category, imageUrl: input.imageUrl, latitude: input.latitude, longitude: input.longitude, address: input.address, description: input.description, ...analysis, status: "AI_ANALYZED", reports: { create: { imageUrl: input.imageUrl, note: input.description, latitude: input.latitude, longitude: input.longitude } }, statusEvents: { create: [{ status: "REPORTED", actor: "citizen", note: "Issue submitted by citizen" }, { status: "AI_ANALYZED", actor: "system", note: "AI-assisted preliminary assessment created" }] } }, include }); }
    async update(publicId, change) { await this.get(publicId); return prisma_js_1.prisma.issue.update({ where: { publicId }, data: { ...(change.assignedTeam !== undefined && { assignedTeam: change.assignedTeam }), ...(change.status && { status: change.status, statusEvents: { create: { status: change.status, note: change.note, actor: "operations" } } }) }, include }); }
    async resolve(publicId, resolution) { await this.get(publicId); return prisma_js_1.prisma.issue.update({ where: { publicId }, data: { status: "RESOLVED", resolution: { upsert: { create: resolution, update: resolution } }, statusEvents: { create: { status: "RESOLVED", actor: "operations", note: "Resolution evidence recorded" } } }, include }); }
}
exports.IssueService = IssueService;
exports.issueService = new IssueService();
