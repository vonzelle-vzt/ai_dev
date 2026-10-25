import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Clock, DollarSign } from "lucide-react"

const mockResults = [
  {
    query: "fitness tracker saas architecture patterns",
    results: [
      { title: "Building a Fitness SaaS with Next.js", source: "dev.to", summary: "Covers Prisma schema design, workout tracking data models, and real-time syncing patterns." },
      { title: "Strava API integration patterns", source: "strava.com", summary: "OAuth flow, activity sync, webhook setup for real-time activity updates." },
    ],
    cost: 0.02,
    cached: false,
    time: "1.2s",
  },
  {
    query: "e-commerce dashboard best practices 2026",
    results: [
      { title: "Modern E-commerce Dashboard Design", source: "uxdesign.cc", summary: "Key metrics to display, chart types for revenue data, and mobile-first dashboard layouts." },
    ],
    cost: 0.00,
    cached: true,
    time: "0.1s",
  },
]

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Research Layer</h1>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input placeholder="Search tech patterns, competitors, docs..." className="pl-10 bg-zinc-900 border-zinc-800" />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4"><p className="text-xs text-zinc-500">Total Queries</p><p className="text-xl font-bold">142</p></CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4"><p className="text-xs text-zinc-500">Cache Hit Rate</p><p className="text-xl font-bold">67%</p></CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4"><p className="text-xs text-zinc-500">Total Cost</p><p className="text-xl font-bold">$2.84</p></CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockResults.map((r, i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-mono text-zinc-300">{r.query}</CardTitle>
                <div className="flex items-center gap-2">
                  {r.cached && <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-0 text-xs">Cached</Badge>}
                  <span className="text-xs text-zinc-500 flex items-center gap-1"><Clock className="h-3 w-3" />{r.time}</span>
                  <span className="text-xs text-zinc-500 flex items-center gap-1"><DollarSign className="h-3 w-3" />${r.cost.toFixed(2)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {r.results.map((result, j) => (
                <div key={j} className="rounded-lg bg-zinc-800/50 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{result.title}</span>
                    <Badge variant="secondary" className="bg-zinc-700 border-0 text-xs text-zinc-400">{result.source}</Badge>
                  </div>
                  <p className="text-xs text-zinc-500">{result.summary}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
