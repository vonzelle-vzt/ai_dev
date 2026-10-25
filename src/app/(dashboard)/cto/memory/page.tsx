import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Flame, Thermometer, Snowflake } from "lucide-react"

const memories = [
  {
    tier: "HOT",
    key: "fitness-tracker:current-task",
    value: "Frontend agent building dashboard layout with Recharts",
    project: "Fitness Tracker",
    accessCount: 24,
    lastAccessed: "2m ago",
  },
  {
    tier: "HOT",
    key: "fitness-tracker:architecture-decisions",
    value: "Using Prisma with Neon, Clerk for auth, Recharts for charts. Rejected Chart.js due to bundle size.",
    project: "Fitness Tracker",
    accessCount: 18,
    lastAccessed: "5m ago",
  },
  {
    tier: "WARM",
    key: "invoice-tracker:revision-patterns",
    value: "Client requested 2 revisions: both were chart-related. Frontend agent should prioritize chart accuracy.",
    project: "Invoice Tracker",
    accessCount: 6,
    lastAccessed: "2d ago",
  },
  {
    tier: "WARM",
    key: "portfolio-site:design-preferences",
    value: "Client prefers minimal design, dark mode, Geist font. Rejected 'playful' style on first review.",
    project: "Portfolio Site",
    accessCount: 4,
    lastAccessed: "5d ago",
  },
  {
    tier: "COLD",
    key: "global:stripe-webhook-pattern",
    value: "Always use idempotency keys. Process checkout.session.completed before subscription events. Store stripeEventId to prevent duplicates.",
    project: "Global",
    accessCount: 12,
    lastAccessed: "14d ago",
  },
  {
    tier: "COLD",
    key: "global:prisma-performance",
    value: "Add @@index on all foreign keys and status columns. Use findFirst instead of findUnique when querying by non-unique fields.",
    project: "Global",
    accessCount: 8,
    lastAccessed: "21d ago",
  },
]

const tierConfig: Record<string, { icon: typeof Flame; color: string; bg: string }> = {
  HOT: { icon: Flame, color: "text-red-400", bg: "bg-red-500/10" },
  WARM: { icon: Thermometer, color: "text-amber-400", bg: "bg-amber-500/10" },
  COLD: { icon: Snowflake, color: "text-blue-400", bg: "bg-blue-500/10" },
}

export default function MemoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agent Memory</h1>
          <p className="text-zinc-400 mt-1">3-tier memory system: Hot (Redis) → Warm (Postgres) → Cold (pgvector)</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {(["HOT", "WARM", "COLD"] as const).map(tier => {
          const config = tierConfig[tier]
          const count = memories.filter(m => m.tier === tier).length
          return (
            <Card key={tier} className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bg}`}>
                  <config.icon className={`h-5 w-5 ${config.color}`} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">{tier} Memory</p>
                  <p className="text-xl font-bold">{count} entries</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input placeholder="Semantic search across all memory tiers..." className="pl-10 bg-zinc-900 border-zinc-800" />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="HOT">Hot</TabsTrigger>
          <TabsTrigger value="WARM">Warm</TabsTrigger>
          <TabsTrigger value="COLD">Cold</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {memories.map(mem => {
            const config = tierConfig[mem.tier]
            return (
              <Card key={mem.key} className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    <config.icon className={`h-4 w-4 mt-0.5 shrink-0 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs font-mono text-zinc-300">{mem.key}</code>
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 border-0 text-xs">{mem.project}</Badge>
                      </div>
                      <p className="text-sm text-zinc-400">{mem.value}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-zinc-600">
                        <span>Accessed {mem.accessCount}x</span>
                        <span>Last: {mem.lastAccessed}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
