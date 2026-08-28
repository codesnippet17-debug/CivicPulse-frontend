import { RequestHandler } from "express";
import { issueService } from "../services/issue.service.js";
import { createIssueSchema, listIssuesSchema, resolveIssueSchema, updateIssueSchema } from "../validators/issue.validator.js";

export const listIssues: RequestHandler = async (req, res) => { const result = await issueService.list(listIssuesSchema.parse(req.query)); res.json({ data: result.issues, meta: result.meta }); };
export const getIssue: RequestHandler = async (req, res) => { res.json({ data: await issueService.get(req.params.publicId) }); };
export const createIssue: RequestHandler = async (req, res) => { const issue = await issueService.create(createIssueSchema.parse(req.body)); res.status(201).location(`/api/v1/issues/${issue.publicId}`).json({ data: issue }); };
export const updateIssue: RequestHandler = async (req, res) => { const issue = await issueService.update(req.params.publicId, updateIssueSchema.parse(req.body)); res.json({ data: issue }); };
export const resolveIssue: RequestHandler = async (req, res) => { const issue = await issueService.resolve(req.params.publicId, resolveIssueSchema.parse(req.body)); res.json({ data: issue }); };
