import { z } from "zod";
const categories = ["POTHOLE", "GARBAGE", "STREETLIGHT", "OBSTRUCTION", "WATERLOGGING"] as const;
const statuses = ["REPORTED", "AI_ANALYZED", "VERIFIED", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "RESOLUTION_VERIFIED", "CLOSED"] as const;
const coordinate = z.number().finite();

export const createIssueSchema = z.object({ category: z.enum(categories), imageUrl: z.string().url().max(2048), latitude: coordinate.min(-90).max(90), longitude: coordinate.min(-180).max(180), address: z.string().trim().min(3).max(180).optional(), description: z.string().trim().max(1000).optional() });
export const listIssuesSchema = z.object({ category: z.enum(categories).optional(), status: z.enum(statuses).optional(), minSeverity: z.coerce.number().min(0).max(10).optional(), limit: z.coerce.number().int().min(1).max(100).default(50), page: z.coerce.number().int().min(1).default(1) });
export const updateIssueSchema = z.object({ status: z.enum(statuses).optional(), assignedTeam: z.string().trim().min(2).max(100).nullable().optional(), note: z.string().trim().max(500).optional() }).refine((data) => data.status !== undefined || data.assignedTeam !== undefined, "At least one change is required");
export const resolveIssueSchema = z.object({ afterImageUrl: z.string().url().max(2048).optional(), verificationScore: z.number().int().min(0).max(100).optional(), citizenConfirmed: z.boolean().optional() });
export type CreateIssueInput = z.infer<typeof createIssueSchema>;
