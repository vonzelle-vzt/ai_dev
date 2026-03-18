import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Clock, Rocket, Globe, GitBranch, ExternalLink, Shield, Gauge } from "lucide-react"

const deploySteps = [
  { label: "Build", status: "COMPLETED", detail: "Next.js build successful (42s)" },
  { label: "Deploy to Vercel", status: "COMPLETED", detail: "Deployment dpl_abc123 created" },
  { label: "Health Check", status: "COMPLETED", detail: "All endpoints responding 200" },
  { label: "Lighthouse Audit", status: "COMPLETED", detail: "Perf: 96, A11y: 92, SEO: 100" },
  { label: "DNS Propagation", status: "COMPLETED", detail: "Custom domain active" },
]

export default async function DeployPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Production Deployment</h1>
          <p className="text-zinc-400 mt-1">Your app is live and ready.</p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-0">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" /> Live
        </Badge>
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <Globe className="h-5 w-5 text-blue-400" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-500">Production URL</p>
              <p className="text-sm font-mono truncate">fitness-tracker.vercel.app</p>
            </div>
            <Button variant="ghost" size="sm"><ExternalLink className="h-4 w-4" /></Button>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <GitBranch className="h-5 w-5 text-purple-400" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-500">Repository</p>
              <p className="text-sm font-mono truncate">github.com/client/fitness-tracker</p>
            </div>
            <Button variant="ghost" size="sm"><ExternalLink className="h-4 w-4" /></Button>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-400" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-500">SSL Certificate</p>
              <p className="text-sm">Active — Auto-renewing</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Steps */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Deployment Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {deploySteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-zinc-500">{step.detail}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Handoff */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Handoff Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Architecture Documentation",
            "API Reference",
            "Environment Variables Guide",
            "Deployment Guide",
            "Database Schema Reference",
          ].map(doc => (
            <div key={doc} className="flex items-center justify-between rounded-lg bg-zinc-800/50 p-3">
              <span className="text-sm">{doc}</span>
              <Button variant="ghost" size="sm" className="text-zinc-400">Download</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" className="border-zinc-700">
          <Rocket className="mr-2 h-4 w-4" /> Redeploy
        </Button>
        <Button variant="outline" className="border-zinc-700">
          Rollback to Previous
        </Button>
      </div>
    </div>
  )
}
