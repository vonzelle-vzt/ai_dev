import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Clock, Shield, TestTube2, Gauge, Eye, AlertTriangle } from "lucide-react"

const gates = [
  { type: "Test Coverage", icon: TestTube2, status: "PASSED", score: 87, threshold: 80, details: "142 tests, 87% coverage" },
  { type: "Security Scan", icon: Shield, status: "PASSED", score: 95, threshold: 90, details: "0 critical, 1 medium (mitigated)" },
  { type: "Performance", icon: Gauge, status: "PASSED", score: 96, threshold: 90, details: "Lighthouse: Perf 96, A11y 92, SEO 100" },
  { type: "Accessibility", icon: Eye, status: "FAILED", score: 72, threshold: 80, details: "3 WCAG AA violations found" },
  { type: "CTO Review", icon: AlertTriangle, status: "PENDING", score: 0, threshold: 0, details: "Awaiting manual review" },
  { type: "Client Sign-off", icon: CheckCircle2, status: "PENDING", score: 0, threshold: 0, details: "Awaiting client approval" },
]

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  PASSED: { color: "bg-emerald-500/10 text-emerald-400", icon: CheckCircle2 },
  FAILED: { color: "bg-red-500/10 text-red-400", icon: XCircle },
  PENDING: { color: "bg-zinc-500/10 text-zinc-400", icon: Clock },
  RUNNING: { color: "bg-blue-500/10 text-blue-400", icon: Clock },
}

export default async function QualityGatesPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quality Gates</h1>
          <p className="text-zinc-400 mt-1">Project: Fitness Tracker SaaS</p>
        </div>
        <Button variant="outline" className="border-zinc-700">Re-run All Gates</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-3xl font-bold text-emerald-400">4/6</p>
            <p className="text-xs text-zinc-500 mt-1">Gates Passed</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-3xl font-bold text-red-400">1</p>
            <p className="text-xs text-zinc-500 mt-1">Failed</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-3xl font-bold text-zinc-400">2</p>
            <p className="text-xs text-zinc-500 mt-1">Pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {gates.map(gate => {
          const config = statusConfig[gate.status]
          return (
            <Card key={gate.type} className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 shrink-0">
                    <gate.icon className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">{gate.type}</h3>
                      <Badge className={config.color + " border-0 text-xs"}>{gate.status}</Badge>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">{gate.details}</p>
                  </div>
                  {gate.score > 0 && (
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold">{gate.score}</p>
                      <p className="text-xs text-zinc-500">/ {gate.threshold} min</p>
                    </div>
                  )}
                  {gate.status === "FAILED" && (
                    <Button size="sm" variant="outline" className="border-zinc-700 shrink-0">Override</Button>
                  )}
                  {gate.status === "PENDING" && gate.type === "CTO Review" && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shrink-0">Approve</Button>
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
