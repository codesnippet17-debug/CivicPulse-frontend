"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateIssue = estimateIssue;
// Adapter boundary: replace this deterministic demo assessment with a vetted vision provider.
// Its output is deliberately labeled as an estimate, never as a confirmation.
function estimateIssue(category) { const values = { POTHOLE: [8.7, 96, 92, "Potential road hazard detected from the supplied evidence."], GARBAGE: [6.8, 91, 70, "Waste accumulation detected near a public area."], STREETLIGHT: [5.9, 88, 61, "Possible streetlight outage detected; human verification is required."], OBSTRUCTION: [7.2, 84, 76, "Potential obstruction detected in a public right-of-way."], WATERLOGGING: [7.6, 89, 79, "Standing water detected; drainage assessment is recommended."] }; const [severity, confidence, priority, aiSummary] = values[category]; return { severity, confidence, priority, aiSummary }; }
