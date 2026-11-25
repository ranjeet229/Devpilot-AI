export const workflowStatuses = ["pending", "running", "awaiting_approval", "completed", "failed", "cancelled"] as const;
export type WorkflowStatus = (typeof workflowStatuses)[number];

export const agentStatuses = ["pending", "running", "completed", "failed", "skipped"] as const;
export type AgentStatus = (typeof agentStatuses)[number];

export type HealthResponse = {
  status: "ok" | "ready";
  service: string;
};
