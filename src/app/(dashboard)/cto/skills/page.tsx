import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Star, Zap } from "lucide-react"

const skills = [
  { name: "stripe-billing", source: "PLATFORM", tags: ["payments", "subscriptions"], successRate: 97, usageCount: 34 },
  { name: "clerk-auth", source: "PLATFORM", tags: ["authentication", "multi-tenant"], successRate: 99, usageCount: 45 },
  { name: "shadcn-compose", source: "PLATFORM", tags: ["ui", "components"], successRate: 96, usageCount: 42 },
  { name: "neon-postgres", source: "PLATFORM", tags: ["database", "prisma"], successRate: 98, usageCount: 38 },
  { name: "recharts-dashboard", source: "LEARNED", tags: ["charts", "analytics"], successRate: 94, usageCount: 18 },
  { name: "e2e-playwright", source: "PLATFORM", tags: ["testing", "e2e"], successRate: 92, usageCount: 30 },
  { name: "nextjs-image-optimization", source: "LEARNED", tags: ["performance", "images"], successRate: 95, usageCount: 12 },
  { name: "webhook-handler-pattern", source: "LEARNED", tags: ["api", "webhooks"], successRate: 98, usageCount: 8 },
]

const sourceColors: Record<string, string> = {
  PLATFORM: "bg-blue-500/10 text-blue-400",
  LEARNED: "bg-emerald-500/10 text-emerald-400",
  DYNAMIC: "bg-purple-500/10 text-purple-400",
}

export default function SkillsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skill Registry</h1>
          <p className="text-zinc-400 mt-1">Skills injected into agents at runtime for better outputs.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" /> Create Skill</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4"><p className="text-xs text-zinc-500">Total Skills</p><p className="text-xl font-bold">{skills.length}</p></CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4"><p className="text-xs text-zinc-500">Platform</p><p className="text-xl font-bold">{skills.filter(s => s.source === "PLATFORM").length}</p></CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4"><p className="text-xs text-zinc-500">Learned</p><p className="text-xl font-bold">{skills.filter(s => s.source === "LEARNED").length}</p></CardContent>
        </Card>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input placeholder="Search skills..." className="pl-10 bg-zinc-900 border-zinc-800" />
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">Skill</TableHead>
                <TableHead className="text-zinc-500">Source</TableHead>
                <TableHead className="text-zinc-500">Tags</TableHead>
                <TableHead className="text-zinc-500">Success</TableHead>
                <TableHead className="text-zinc-500">Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map(skill => (
                <TableRow key={skill.name} className="border-zinc-800 cursor-pointer hover:bg-zinc-800/50">
                  <TableCell className="font-medium font-mono text-sm">{skill.name}</TableCell>
                  <TableCell>
                    <Badge className={sourceColors[skill.source] + " border-0 text-xs"}>{skill.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {skill.tags.map(t => (
                        <Badge key={t} variant="secondary" className="bg-zinc-800 text-zinc-400 border-0 text-xs">{t}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 text-amber-400" /> {skill.successRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-zinc-400 text-sm">{skill.usageCount} projects</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
