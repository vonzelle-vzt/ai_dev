import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Plus, Clock, FolderKanban, RotateCcw } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Manage your projects and track progress.</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </Link>
      </div>

      {/* Usage Meters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-zinc-500">
              <Clock className="h-4 w-4" /> Agent Hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">0</span>
              <span className="text-zinc-500 text-sm">/ 80 hrs</span>
            </div>
            <Progress value={0} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-zinc-500">
              <FolderKanban className="h-4 w-4" /> Active Projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">0</span>
              <span className="text-zinc-500 text-sm">/ 2</span>
            </div>
            <Progress value={0} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-zinc-500">
              <RotateCcw className="h-4 w-4" /> Revision Rounds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">0</span>
              <span className="text-zinc-500 text-sm">/ 3</span>
            </div>
            <Progress value={0} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      <Card className="bg-zinc-900 border-zinc-800 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800 mb-4">
            <FolderKanban className="h-8 w-8 text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium mb-1">No projects yet</h3>
          <p className="text-zinc-500 text-sm mb-4">Submit your first brief and let our AI team build it.</p>
          <Link href="/dashboard/projects/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Start Your First Project
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
