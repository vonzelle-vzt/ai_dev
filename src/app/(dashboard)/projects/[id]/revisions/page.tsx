import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Circle, Bot } from "lucide-react"

const revisions = [
  {
    round: 1,
    status: "COMPLETED",
    submittedAt: "Mar 16, 2026",
    completedAt: "Mar 16, 2026",
    items: [
      { description: "Chart should show weekly data, not daily", status: "COMPLETED", category: "UI", agent: "Frontend" },
      { description: "Add 'last 30 days' filter option", status: "COMPLETED", category: "Feature", agent: "Frontend" },
      { description: "Update logo to latest version", status: "COMPLETED", category: "Design", agent: "Design" },
    ],
  },
  {
    round: 2,
    status: "IN_PROGRESS",
    submittedAt: "Mar 18, 2026",
    completedAt: null,
    items: [
      { description: "Export button for chart data (CSV)", status: "IN_PROGRESS", category: "Feature", agent: "Frontend" },
      { description: "Mobile navigation hamburger menu broken", status: "COMPLETED", category: "Bug", agent: "Frontend" },
    ],
  },
]

const itemStatusConfig: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  COMPLETED: { icon: CheckCircle2, color: "text-emerald-400" },
  IN_PROGRESS: { icon: Clock, color: "text-blue-400" },
  PENDING: { icon: Circle, color: "text-zinc-600" },
}

export default function RevisionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Revisions</h1>
          <p className="text-zinc-400 mt-1">Track revision rounds and item status.</p>
        </div>
        <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 border-0">
          Round 2 of 3 included
        </Badge>
      </div>

      <div className="space-y-6">
        {revisions.map(rev => (
          <Card key={rev.round} className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">Round {rev.round}</CardTitle>
                  <Badge className={
                    rev.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-400 border-0" :
                    rev.status === "IN_PROGRESS" ? "bg-blue-500/10 text-blue-400 border-0" :
                    "bg-zinc-500/10 text-zinc-400 border-0"
                  }>{rev.status.replace("_", " ")}</Badge>
                </div>
                <span className="text-xs text-zinc-500">Submitted: {rev.submittedAt}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {rev.items.map((item, i) => {
                const config = itemStatusConfig[item.status]
                return (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-zinc-800/50 p-3">
                    <config.icon className={`h-4 w-4 shrink-0 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-zinc-700 text-zinc-400 border-0 text-xs">{item.category}</Badge>
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Bot className="h-3 w-3" /> {item.agent}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-zinc-900 border-zinc-800 border-dashed">
        <CardContent className="pt-6 pb-6 text-center">
          <p className="text-zinc-500 text-sm">1 revision round remaining on your plan.</p>
          <Button variant="outline" className="mt-3 border-zinc-700">Purchase Extra Round — $29</Button>
        </CardContent>
      </Card>
    </div>
  )
}
