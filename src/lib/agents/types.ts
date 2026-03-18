export type AgentType = "ORCHESTRATOR" | "ARCHITECT" | "FRONTEND" | "BACKEND" | "QA" | "SECURITY" | "DEVOPS" | "DESIGN"

export interface AgentConfig {
  type: AgentType
  model: string
  maxTokens: number
  systemPrompt: string
  tools: string[]
  outputArtifacts: string[]
}

export interface SwarmPhase {
  name: string
  agents: AgentType[]
  durationEstimate: string
  deliverables: string[]
}

export const SWARM_PHASES: SwarmPhase[] = [
  {
    name: "DESIGN",
    agents: ["ARCHITECT", "DESIGN"],
    durationEstimate: "30 min",
    deliverables: ["architecture.md", "design-tokens.json", "prisma/schema.prisma", "api-contracts.ts"],
  },
  {
    name: "BUILD",
    agents: ["FRONTEND", "BACKEND"],
    durationEstimate: "2-6 hours",
    deliverables: ["pages", "components", "api-routes", "services", "migrations"],
  },
  {
    name: "INTEGRATE",
    agents: ["ORCHESTRATOR"],
    durationEstimate: "30 min",
    deliverables: ["merged-codebase", "integration-tests"],
  },
  {
    name: "QUALITY",
    agents: ["QA", "SECURITY"],
    durationEstimate: "30 min",
    deliverables: ["test-results", "security-audit"],
  },
  {
    name: "DEPLOY",
    agents: ["DEVOPS"],
    durationEstimate: "15 min",
    deliverables: ["staging-url", "lighthouse-report"],
  },
  {
    name: "HANDOFF",
    agents: ["ORCHESTRATOR"],
    durationEstimate: "10 min",
    deliverables: ["handoff-doc", "client-notification"],
  },
]

export const AGENT_CONFIGS: Record<AgentType, AgentConfig> = {
  ORCHESTRATOR: {
    type: "ORCHESTRATOR",
    model: "anthropic/claude-sonnet-4.6",
    maxTokens: 200000,
    systemPrompt: "You are the Orchestrator Agent. Coordinate the build pipeline, dispatch agents in phase order, resolve conflicts, and report progress.",
    tools: ["dispatchAgent", "checkStatus", "resolveConflict", "reportProgress"],
    outputArtifacts: ["pipeline-status"],
  },
  ARCHITECT: {
    type: "ARCHITECT",
    model: "anthropic/claude-sonnet-4.6",
    maxTokens: 300000,
    systemPrompt: "You are the Architect Agent. Produce architecture specs, database schemas, API contracts, and component trees from project briefs.",
    tools: ["writeFile", "readFile", "runCommand", "searchTechPatterns", "readArchitecture"],
    outputArtifacts: ["architecture.md", "schema.prisma", "api-contracts.ts", "component-tree.md"],
  },
  FRONTEND: {
    type: "FRONTEND",
    model: "anthropic/claude-sonnet-4.6",
    maxTokens: 400000,
    systemPrompt: "You are the Frontend Agent. Build Next.js pages, React components, and styles using shadcn/ui and Tailwind CSS.",
    tools: ["writeFile", "readFile", "runCommand", "readArchitecture", "getDesignTokens"],
    outputArtifacts: ["pages", "components", "styles"],
  },
  BACKEND: {
    type: "BACKEND",
    model: "anthropic/claude-sonnet-4.6",
    maxTokens: 400000,
    systemPrompt: "You are the Backend Agent. Build Next.js API routes, server actions, database services, and auth middleware.",
    tools: ["writeFile", "readFile", "runCommand", "readArchitecture", "runMigration"],
    outputArtifacts: ["api-routes", "services", "migrations"],
  },
  QA: {
    type: "QA",
    model: "openai/gpt-5.4",
    maxTokens: 400000,
    systemPrompt: "You are the QA Agent. Write and run tests using Vitest and Playwright. Ensure 80%+ coverage.",
    tools: ["readFile", "writeFile", "runTests", "reportProgress"],
    outputArtifacts: ["test-files", "coverage-report"],
  },
  SECURITY: {
    type: "SECURITY",
    model: "anthropic/claude-sonnet-4.6",
    maxTokens: 300000,
    systemPrompt: "You are the Security Agent. Scan for OWASP vulnerabilities, check dependencies, audit auth flows.",
    tools: ["readFile", "scanSAST", "scanDeps", "reportProgress"],
    outputArtifacts: ["security-audit", "patches"],
  },
  DEVOPS: {
    type: "DEVOPS",
    model: "openai/gpt-5.4",
    maxTokens: 300000,
    systemPrompt: "You are the DevOps Agent. Create GitHub repos, configure CI/CD, deploy to Vercel, set up databases.",
    tools: ["createRepo", "pushCode", "deployToVercel", "setEnvVars", "setupSupabase", "runMigration"],
    outputArtifacts: ["deployment-config", "ci-pipeline"],
  },
  DESIGN: {
    type: "DESIGN",
    model: "google/gemini-3.1-flash-image-preview",
    maxTokens: 200000,
    systemPrompt: "You are the Design Agent. Generate design tokens, OG images, favicons, and CSS variables from briefs.",
    tools: ["writeFile", "readFile", "generateImage", "findSimilarSites", "getDesignTokens"],
    outputArtifacts: ["design-tokens.json", "og-image.png", "favicon.svg", "globals.css"],
  },
}
