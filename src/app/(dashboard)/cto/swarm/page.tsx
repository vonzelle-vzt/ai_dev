import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Pause, Skull, MessageSquare, FileText, DollarSign, Activity, CheckCircle2, Clock, Loader2 } from "lucide-react"

const agentStatusIcon: Record<string, { icon: typeof Bot; color: string }> = {
  RUNNING: { icon: Loader2, color: "text-emerald-400" },
  COMPLETED: { icon: CheckCircle2, color: "text-emerald-400" },
  QUEUED: { icon: Clock, color: "text-zinc-500" },
}

const mockSwarm = {
  project: "Fitness Tracker SaaS",
  client: "Sarah Chen",
  phase: "BUILD",
  totalCost: 10.37,
  estCost: 18.0,
  hoursUsed: 32,
  estHours: 45,
  agents: [
    { type: "Orchestrator", status: "RUNNING", action: "Monitoring", cost: 0.82, time: "1h 45m", progress: 100 },
    { type: "Design", status: "COMPLETED", action: "Completed", cost: 1.20, time: "25m", progress: 100 },
    { type: "Architect", status: "COMPLETED", action: "Completed", cost: 2.15, time: "40m", progress: 100 },
    { type: "Frontend", status: "RUNNING", action: "Building pages", cost: 3.40, time: "1h 10m", progress: 65 },
    { type: "Backend", status: "RUNNING", action: "Building APIs", cost: 2.80, time: "55m", progress: 50 },
    { type: "QA", status: "QUEUED", action: "Queued", cost: 0, time: "—", progress: 0 },
    { type: "Security", status: "QUEUED", action: "Queued", cost: 0, time: "—", progress: 0 },
    { type: "DevOps", status: "QUEUED", action: "Queued", cost: 0, time: "—", progress: 0 },
  ],
  liveOutput: [
    "Creating app/(dashboard)/page.tsx...",
    "→ Card component with Recharts line chart",
    "→ Workout log table with DataTable",
    "→ Progress ring component (daily goal)",
    "Installing recharts@2.15.0...",
  ],
}

export default function SwarmControlPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Swarm Control</h1>
          <p className="text-zinc-400 mt-1">Monitor and manage active agent swarms.</p>
        </div>
        <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
          <Skull className="mr-2 h-4 w-4" /> Kill All
        </Button>
      </div>

      {/* Pool Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Running", value: "6 / 20", icon: Activity },
          { label: "Queued", value: "4 waiting", icon: Clock },
          { label: "Today Cost", value: "$14.82", icon: DollarSign },
          { label: "Success Rate", value: "96.2%", icon: CheckCircle2 },
        ].map(s => (
          <Card key={s.label} className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-4 pb-4 flex items-center gap-3">
              <s.icon className="h-5 w-5 text-zinc-500" />
              <div>
                <p className="text-xs text-zinc-500">{s.label}</p>
                <p className="text-lg font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Swarm */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{mockSwarm.project}</CardTitle>
              <p className="text-sm text-zinc-400 mt-1">Client: {mockSwarm.client} — Phase: {mockSwarm.phase}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-zinc-700"><Pause className="mr-1 h-3 w-3" /> Pause</Button>
              <Button size="sm" variant="outline" className="border-zinc-700"><MessageSquare className="mr-1 h-3 w-3" /> Message</Button>
              <Button size="sm" variant="outline" className="border-zinc-700"><FileText className="mr-1 h-3 w-3" /> Architecture</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Agent Rows */}
          <div className="space-y-2">
            {mockSwarm.agents.map(agent => {
              const si = agentStatusIcon[agent.status] || agentStatusIcon.QUEUED
              return (
                <div key={agent.type} className="flex items-center gap-4 rounded-lg bg-zinc-800/50 p-3">
                  <si.icon className={`h-4 w-4 shrink-0 ${si.color} ${agent.status === "RUNNING" ? "animate-spin" : ""}`} />
                  <div className="w-24 shrink-0">
                    <p className="text-sm font-medium">{agent.type}</p>
                    <p className="text-xs text-zinc-500">{agent.action}</p>
                  </div>
                  <div className="flex-1">
                    {agent.progress > 0 && agent.status !== "COMPLETED" && (
                      <Progress value={agent.progress} className="h-1.5" />
                    )}
                  </div>
                  <span className="text-xs text-zinc-500 w-16 text-right">${agent.cost.toFixed(2)}</span>
                  <span className="text-xs text-zinc-500 w-16 text-right">{agent.time}</span>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between text-sm text-zinc-400 pt-2 border-t border-zinc-800">
            <span>Total: ${mockSwarm.totalCost.toFixed(2)} / est. ${mockSwarm.estCost.toFixed(2)}</span>
            <span>{mockSwarm.hoursUsed} hrs used / {mockSwarm.estHours} est.</span>
          </div>

          {/* Live Output */}
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader className="py-2 px-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-zinc-500">Live Output (Frontend Agent)</span>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <ScrollArea className="h-[120px]">
                <pre className="font-mono text-xs text-zinc-400 space-y-0.5">
                  {mockSwarm.liveOutput.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
