import { demoIssues } from "@/data/demoIssues";
import { CivicIssue, IssueStatus } from "@/types/issue";

// Replace this module with a database repository (Prisma/Firebase/etc.) in production.
// Keeping it behind this small interface prevents UI routes from depending on storage.
const globalStore = globalThis as unknown as { civicIssues?: CivicIssue[] };
const issues = globalStore.civicIssues ?? demoIssues.map((issue) => ({ ...issue }));
globalStore.civicIssues = issues;

export const issueStore = {
  all: () => issues,
  find: (id: string) => issues.find((issue) => issue.id === id),
  create: (issue: CivicIssue) => { issues.unshift(issue); return issue; },
  updateStatus: (id: string, status: IssueStatus) => {
    const issue = issues.find((entry) => entry.id === id);
    if (!issue) return undefined;
    issue.status = status;
    issue.updatedAt = new Date().toISOString();
    return issue;
  },
};
