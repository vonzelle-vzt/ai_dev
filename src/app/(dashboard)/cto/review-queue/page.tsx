import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Clock, CheckCircle2, MessageSquare, Sparkles } from "lucide-react"

const mockQueue = [
  {
    id: "1",
    clientName: "Sarah Chen",
    plan: "Annual",
    project: "AI-powered recipe app with meal planning",
    submittedAgo: "2 hours",
    status: "NEW",
    complexity: 7,
    estHours: 45,
    estDays: "5-7",
    features: ["Auth", "AI chat", "Recipe DB", "Meal calendar", "Grocery list", "Stripe billing"],
    risks: ["AI image generation (needs image model)", "Recipe data sourcing (needs API or scraper)"],
    suggestedStack: "Next.js + Neon + Clerk + AI Gateway",
  },
  {
    id: "2",
    clientName: "Marcus Lee",
    plan: "Monthly",
    project: "Freelancer invoice tracker",
    submittedAgo: "1 day",
    status: "AWAITING_CLIENT",
    complexity: 4,
    estHours: 20,
    estDays: "3-4",
    features: ["Auth", "Invoices", "Clients", "Dashboard"],
    risks: [],
    suggestedStack: "Next.js + Neon + Clerk",
  },
  {
    id: "3",
    clientName: "Amy Park",
    plan: "Annual",
    project: "E-commerce dashboard",
    submittedAgo: "3 hours",
    status: "REVISION",
    complexity: 5,
    estHours: 30,
    estDays: "4-5",
    features: ["Charts", "Export", "Mobile nav"],
    risks: [],
    suggestedStack: "Next.js + Neon + Recharts",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: typeof AlertCircle }> = {
  NEW: { label: "New Brief", color: "bg-red-500/10 text-red-400", icon: AlertCircle },
  AWAITING_CLIENT: { label: "Awaiting Client", color: "bg-amber-500/10 text-amber-400", icon: Clock },
  REVISION: { label: "Revision Request", color: "bg-emerald-500/10 text-emerald-400", icon: CheckCircle2 },
}

export default function ReviewQueuePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Review Queue</h1>
          <p className="text-zinc-400 mt-1">{mockQueue.length} items pending review</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Agents", value: "12" },
          { label: "Builds", value: "5 active" },
          { label: "Revenue MTD", value: "$4,750" },
          { label: "Queue Depth", value: "3 briefs" },
        ].map(s => (
          <Card key={s.label} className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-zinc-500">{s.label}</p>
              <p className="text-xl font-bold mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Queue Items */}
      <div className="space-y-4">
        {mockQueue.map(item => {
          const status = statusConfig[item.status]
          return (
            <Card key={item.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge className={status.color + " border-0"}>
                      <status.icon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                    {item.plan === "Annual" && (
                      <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-0">Priority</Badge>
                    )}
                  </div>
                  <span className="text-xs text-zinc-500">{item.submittedAgo} ago</span>
                </div>

                <p className="text-sm text-zinc-400">Client: {item.clientName} ({item.plan} plan)</p>
                <p className="text-lg font-medium mt-1">{item.project}</p>

                {item.status === "NEW" && (
                  <Card className="bg-zinc-800/50 border-zinc-700 mt-4">
                    <CardContent className="pt-4 pb-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium">AI Scope Assessment</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-zinc-500">Complexity</p>
                          <p className="font-medium">{item.complexity}/10</p>
                        </div>
                        <div>
                          <p className="text-zinc-500">Est. Hours</p>
                          <p className="font-medium">{item.estHours} hrs</p>
                        </div>
                        <div>
                          <p className="text-zinc-500">Est. Days</p>
                          <p className="font-medium">{item.estDays}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Features</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.features.map(f => (
                            <Badge key={f} variant="secondary" className="bg-zinc-700 text-zinc-300 border-0 text-xs">{f}</Badge>
                          ))}
                        </div>
                      </div>
                      {item.risks.length > 0 && (
                        <div>
                          <p className="text-xs text-amber-400">Risk Flags</p>
                          {item.risks.map(r => (
                            <p key={r} className="text-xs text-zinc-400 mt-0.5">• {r}</p>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-zinc-500">Suggested: {item.suggestedStack}</p>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-2 mt-4">
                  {item.status === "NEW" && (
                    <>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Generate Architecture</Button>
                      <Button size="sm" variant="outline" className="border-zinc-700">Request Clarification</Button>
                      <Button size="sm" variant="outline" className="border-zinc-700 text-red-400">Decline</Button>
                    </>
                  )}
                  {item.status === "AWAITING_CLIENT" && (
                    <>
                      <Button size="sm" variant="outline" className="border-zinc-700">Nudge Client</Button>
                      <Button size="sm" variant="outline" className="border-zinc-700">Edit Architecture</Button>
                    </>
                  )}
                  {item.status === "REVISION" && (
                    <>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Auto-dispatch Agents</Button>
                      <Button size="sm" variant="outline" className="border-zinc-700">Review Feedback</Button>
                      <Button size="sm" variant="outline" className="border-zinc-700"><MessageSquare className="mr-1 h-3 w-3" /> Chat</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
