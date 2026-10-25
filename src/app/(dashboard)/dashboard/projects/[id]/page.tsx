import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, Circle, Eye, MessageSquare, RotateCcw } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-zinc-500/10 text-zinc-400",
  BRIEF_SUBMITTED: "bg-amber-500/10 text-amber-400",
  SCOPING: "bg-purple-500/10 text-purple-400",
  ARCHITECTURE_APPROVED: "bg-blue-500/10 text-blue-400",
  IN_BUILD: "bg-blue-500/10 text-blue-400",
  IN_QA: "bg-amber-500/10 text-amber-400",
  STAGING_REVIEW: "bg-amber-500/10 text-amber-400",
  DEPLOYED: "bg-emerald-500/10 text-emerald-400",
  COMPLETED: "bg-emerald-500/10 text-emerald-400",
}

// Mock data for display
const mockProject = {
  name: "Fitness Tracker SaaS",
  status: "IN_BUILD",
  progress: 45,
  estimatedDays: 6,
  createdAt: "2026-03-14",
  techStack: ["Next.js", "Clerk", "Neon", "Stripe", "Tailwind"],
  milestones: [
    { title: "Architecture", status: "COMPLETED" },
    { title: "Design", status: "COMPLETED" },
    { title: "Frontend", status: "IN_PROGRESS" },
    { title: "Backend", status: "PENDING" },
    { title: "QA", status: "PENDING" },
    { title: "Security", status: "PENDING" },
    { title: "Deploy", status: "PENDING" },
  ],
  activity: [
    { agent: "Frontend", action: "Building dashboard layout...", time: "2m ago" },
    { agent: "Frontend", action: "Created 4 chart components", time: "4m ago" },
    { agent: "Backend", action: "API routes for /api/workouts", time: "8m ago" },
    { agent: "Backend", action: "Database schema migrated", time: "21m ago" },
    { agent: "Design", action: "Design tokens generated", time: "41m ago" },
    { agent: "CTO", action: "Architecture approved", time: "1h ago" },
  ],
}

export default function ProjectDetailPage() {
  const project = mockProject

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <Badge className={STATUS_COLORS[project.status] + " border-0"}>{project.status.replace(/_/g, " ")}</Badge>
          </div>
          <p className="text-zinc-400 mt-1">Started Mar 14 — Est. {project.estimatedDays} days</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-zinc-700"><Eye className="mr-2 h-4 w-4" /> View Staging</Button>
          <Button variant="outline" size="sm" className="border-zinc-700"><MessageSquare className="mr-2 h-4 w-4" /> Chat</Button>
          <Button variant="outline" size="sm" className="border-zinc-700"><RotateCcw className="mr-2 h-4 w-4" /> Request Revision</Button>
        </div>
      </div>

      {/* Progress */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Build Progress</span>
            <span className="text-sm text-zinc-400">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Milestones */}
        <Card className="bg-zinc-900 border-zinc-800 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.milestones.map((m) => (
                <div key={m.title} className="flex items-center gap-3">
                  {m.status === "COMPLETED" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  ) : m.status === "IN_PROGRESS" ? (
                    <div className="h-5 w-5 rounded-full border-2 border-blue-400 flex items-center justify-center shrink-0">
                      <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                    </div>
                  ) : (
                    <Circle className="h-5 w-5 text-zinc-700 shrink-0" />
                  )}
                  <span className={m.status === "PENDING" ? "text-zinc-600" : "text-zinc-200"}>{m.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {project.activity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-zinc-500 text-xs w-12 shrink-0 pt-0.5">{a.time}</span>
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 border-0 shrink-0 text-xs">{a.agent}</Badge>
                    <span className="text-zinc-300">{a.action}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Tech Stack */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Tech Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(t => (
              <Badge key={t} variant="secondary" className="bg-zinc-800 text-zinc-300 border-0">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
