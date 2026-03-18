export interface Feature {
  id: string
  name: string
  description: string
  category: string
  complexity: number // 1-5
}

export const FEATURE_CATALOG: Record<string, Feature[]> = {
  AUTHENTICATION: [
    { id: "auth-email", name: "Email/password login", description: "Standard email and password authentication", category: "AUTHENTICATION", complexity: 2 },
    { id: "auth-google", name: "Google OAuth", description: "Sign in with Google", category: "AUTHENTICATION", complexity: 1 },
    { id: "auth-github", name: "GitHub OAuth", description: "Sign in with GitHub", category: "AUTHENTICATION", complexity: 1 },
    { id: "auth-magic", name: "Magic link", description: "Passwordless email login", category: "AUTHENTICATION", complexity: 2 },
    { id: "auth-mfa", name: "Multi-factor auth", description: "Two-factor authentication via TOTP", category: "AUTHENTICATION", complexity: 3 },
  ],
  PAYMENTS: [
    { id: "pay-checkout", name: "Stripe checkout", description: "One-time or subscription payments", category: "PAYMENTS", complexity: 3 },
    { id: "pay-subscription", name: "Subscription billing", description: "Recurring subscription management", category: "PAYMENTS", complexity: 4 },
    { id: "pay-metering", name: "Usage metering", description: "Pay-per-use billing", category: "PAYMENTS", complexity: 4 },
    { id: "pay-payouts", name: "Marketplace payouts", description: "Split payments to sellers", category: "PAYMENTS", complexity: 5 },
  ],
  DATA_DISPLAY: [
    { id: "data-dashboard", name: "Dashboard with charts", description: "Analytics dashboard with Recharts", category: "DATA_DISPLAY", complexity: 3 },
    { id: "data-tables", name: "Data tables with filters", description: "Sortable, filterable data tables", category: "DATA_DISPLAY", complexity: 2 },
    { id: "data-charts", name: "Advanced charts", description: "Line, bar, pie, area charts", category: "DATA_DISPLAY", complexity: 2 },
    { id: "data-upload", name: "File uploads", description: "Drag-and-drop file uploads", category: "DATA_DISPLAY", complexity: 2 },
    { id: "data-search", name: "Search & filtering", description: "Full-text search with faceted filters", category: "DATA_DISPLAY", complexity: 3 },
    { id: "data-infinite", name: "Infinite scroll", description: "Paginated infinite scroll lists", category: "DATA_DISPLAY", complexity: 2 },
  ],
  AI_FEATURES: [
    { id: "ai-chat", name: "Chat interface", description: "AI chatbot with streaming responses", category: "AI_FEATURES", complexity: 4 },
    { id: "ai-recommend", name: "Recommendations", description: "AI-powered content/product recommendations", category: "AI_FEATURES", complexity: 4 },
    { id: "ai-content", name: "Content generation", description: "AI text/copy generation", category: "AI_FEATURES", complexity: 3 },
    { id: "ai-image", name: "Image generation", description: "AI image creation", category: "AI_FEATURES", complexity: 4 },
    { id: "ai-rag", name: "Knowledge base / RAG", description: "Document Q&A with embeddings", category: "AI_FEATURES", complexity: 5 },
  ],
  COMMUNICATION: [
    { id: "comm-email", name: "Email notifications", description: "Transactional emails via Resend", category: "COMMUNICATION", complexity: 2 },
    { id: "comm-push", name: "Push notifications", description: "Browser push notifications", category: "COMMUNICATION", complexity: 3 },
    { id: "comm-messaging", name: "In-app messaging", description: "Real-time chat between users", category: "COMMUNICATION", complexity: 4 },
    { id: "comm-sms", name: "SMS notifications", description: "Text message alerts", category: "COMMUNICATION", complexity: 2 },
    { id: "comm-webhooks", name: "Webhooks", description: "Outbound webhook integrations", category: "COMMUNICATION", complexity: 3 },
  ],
  ADMIN_PANEL: [
    { id: "admin-panel", name: "Admin dashboard", description: "Admin panel for content management", category: "ADMIN_PANEL", complexity: 3 },
    { id: "admin-users", name: "User management", description: "CRUD users, roles, permissions", category: "ADMIN_PANEL", complexity: 3 },
    { id: "admin-analytics", name: "Analytics", description: "Usage and business analytics", category: "ADMIN_PANEL", complexity: 3 },
    { id: "admin-moderation", name: "Content moderation", description: "Review and moderate user content", category: "ADMIN_PANEL", complexity: 3 },
    { id: "admin-audit", name: "Audit logs", description: "Track all user and system actions", category: "ADMIN_PANEL", complexity: 2 },
  ],
}

export function getAllFeatures(): Feature[] {
  return Object.values(FEATURE_CATALOG).flat()
}

export function getFeaturesByCategory(category: string): Feature[] {
  return FEATURE_CATALOG[category] || []
}

export function calculateComplexity(selectedFeatures: Feature[], customFeatures: string[]): {
  score: number
  breakdown: { frontend: number; backend: number; integrations: number }
  estimatedDays: number
} {
  const frontend = selectedFeatures.filter(f =>
    ["DATA_DISPLAY", "AI_FEATURES"].includes(f.category)
  ).reduce((sum, f) => sum + f.complexity * 0.8, 0)

  const backend = selectedFeatures.filter(f =>
    ["AUTHENTICATION", "PAYMENTS", "ADMIN_PANEL"].includes(f.category)
  ).reduce((sum, f) => sum + f.complexity * 1.0, 0)

  const integrations = selectedFeatures.filter(f =>
    ["COMMUNICATION"].includes(f.category)
  ).reduce((sum, f) => sum + f.complexity * 1.2, 0)

  const customComplexity = customFeatures.length * 2.5
  const raw = (frontend + backend + integrations + customComplexity) / 4
  const score = Math.min(10, Math.round(raw * 10) / 10)

  let estimatedDays = 3
  if (score > 2) estimatedDays = 4
  if (score > 4) estimatedDays = 6
  if (score > 6) estimatedDays = 10
  if (score > 8) estimatedDays = 14

  return {
    score,
    breakdown: {
      frontend: Math.round(frontend * 10) / 10,
      backend: Math.round(backend * 10) / 10,
      integrations: Math.round(integrations * 10) / 10,
    },
    estimatedDays,
  }
}
