import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, DollarSign, Activity, Clock } from "lucide-react"

export default function ObservabilityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Agent Observability</h1>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Spend Today", value: "$14.82", icon: DollarSign },
          { label: "Active Runs", value: "6", icon: Activity },
          { label: "Avg Duration", value: "42m", icon: Clock },
          { label: "Anomalies", value: "1", icon: AlertTriangle },
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

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Cost Anomalies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Frontend Agent — Fitness Tracker</span>
            </div>
            <p className="text-sm text-zinc-400">Cost is 2.3x above average for this agent type. Expected ~$3.50, current $8.05. May indicate retry loop.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Recent Agent Runs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">Agent</TableHead>
                <TableHead className="text-zinc-500">Project</TableHead>
                <TableHead className="text-zinc-500">Status</TableHead>
                <TableHead className="text-zinc-500">Duration</TableHead>
                <TableHead className="text-zinc-500">Cost</TableHead>
                <TableHead className="text-zinc-500">Tokens</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { agent: "Frontend", project: "Fitness Tracker", status: "RUNNING", duration: "1h 10m", cost: "$3.40", tokens: "145k" },
                { agent: "Backend", project: "Fitness Tracker", status: "RUNNING", duration: "55m", cost: "$2.80", tokens: "112k" },
                { agent: "Design", project: "Fitness Tracker", status: "COMPLETED", duration: "25m", cost: "$1.20", tokens: "48k" },
                { agent: "Frontend", project: "E-commerce Dash", status: "RUNNING", duration: "12m", cost: "$0.45", tokens: "18k" },
              ].map((row, i) => (
                <TableRow key={i} className="border-zinc-800">
                  <TableCell className="font-medium">{row.agent}</TableCell>
                  <TableCell className="text-zinc-400">{row.project}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={
                      row.status === "RUNNING" ? "bg-blue-500/10 text-blue-400 border-0" : "bg-emerald-500/10 text-emerald-400 border-0"
                    }>{row.status}</Badge>
                  </TableCell>
                  <TableCell className="text-zinc-400">{row.duration}</TableCell>
                  <TableCell className="text-zinc-400">{row.cost}</TableCell>
                  <TableCell className="text-zinc-400">{row.tokens}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
