import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Users, FolderKanban, Star } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "MRR", value: "$4,750", change: "+12% MoM", icon: TrendingUp, changeColor: "text-emerald-400" },
          { label: "Subscribers", value: "48", change: "+8 new", icon: Users, changeColor: "text-emerald-400" },
          { label: "Projects", value: "12 active", change: "34 shipped", icon: FolderKanban, changeColor: "text-zinc-400" },
          { label: "Avg CSAT", value: "4.7/5", change: "+0.2", icon: Star, changeColor: "text-emerald-400" },
        ].map(kpi => (
          <Card key={kpi.label} className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-500">{kpi.label}</p>
                <kpi.icon className="h-4 w-4 text-zinc-600" />
              </div>
              <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              <p className={`text-xs mt-1 ${kpi.changeColor}`}>{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue placeholder */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Revenue vs Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-zinc-600">
            <p className="text-sm">Chart renders with live data (Recharts integration)</p>
          </div>
        </CardContent>
      </Card>

      {/* Agent Efficiency */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Agent Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">Agent</TableHead>
                <TableHead className="text-zinc-500">Avg Hours</TableHead>
                <TableHead className="text-zinc-500">Success</TableHead>
                <TableHead className="text-zinc-500">Avg Cost</TableHead>
                <TableHead className="text-zinc-500">Revisions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { agent: "Architect", hours: "1.2", success: "98%", cost: "$2.40", revisions: "0.3/proj" },
                { agent: "Frontend", hours: "4.8", success: "94%", cost: "$8.50", revisions: "1.1/proj" },
                { agent: "Backend", hours: "3.6", success: "96%", cost: "$6.20", revisions: "0.8/proj" },
                { agent: "QA", hours: "1.5", success: "99%", cost: "$1.80", revisions: "0.1/proj" },
                { agent: "Security", hours: "0.8", success: "100%", cost: "$0.90", revisions: "0.0/proj" },
                { agent: "DevOps", hours: "0.6", success: "97%", cost: "$0.70", revisions: "0.2/proj" },
              ].map(row => (
                <TableRow key={row.agent} className="border-zinc-800">
                  <TableCell className="font-medium">{row.agent}</TableCell>
                  <TableCell className="text-zinc-400">{row.hours} hr</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-0">{row.success}</Badge>
                  </TableCell>
                  <TableCell className="text-zinc-400">{row.cost}</TableCell>
                  <TableCell className="text-zinc-400">{row.revisions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
