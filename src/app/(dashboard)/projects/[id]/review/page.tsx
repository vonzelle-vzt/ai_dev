import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Monitor, Tablet, Smartphone, MessageSquare, CheckCircle2, Send } from "lucide-react"

const annotations = [
  { id: 1, content: "Chart should show weekly data, not daily", x: 45, y: 30 },
  { id: 2, content: "Add a 'last 30 days' filter option", x: 70, y: 25 },
  { id: 3, content: "Logo needs to be our updated version", x: 15, y: 10 },
]

const scores = [
  { label: "Perf", value: 96 },
  { label: "A11y", value: 92 },
  { label: "SEO", value: 100 },
  { label: "Best", value: 95 },
]

export default async function StagingReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Staging Review</h1>
          <p className="text-zinc-400 mt-1">Click anywhere on the preview to leave feedback.</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          <Button variant="ghost" size="sm" className="h-8"><Monitor className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" className="h-8"><Tablet className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" className="h-8"><Smartphone className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Staging Preview */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="pt-4 pb-4">
          <div className="relative rounded-lg bg-zinc-950 border border-zinc-800 h-[500px] flex items-center justify-center">
            <p className="text-zinc-600 text-sm">Staging preview loads here via iframe</p>
            {annotations.map(a => (
              <div
                key={a.id}
                className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold cursor-pointer hover:scale-110 transition-transform"
                style={{ left: `${a.x}%`, top: `${a.y}%` }}
              >
                {a.id}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Feedback</CardTitle>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 border-0">Revision Round 1 of 3</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {annotations.map(a => (
            <div key={a.id} className="flex items-center gap-3 rounded-lg bg-zinc-800/50 p-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold shrink-0">
                {a.id}
              </div>
              <p className="text-sm flex-1">{a.content}</p>
              <MessageSquare className="h-4 w-4 text-zinc-500 shrink-0" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Lighthouse Scores */}
      <div className="grid grid-cols-4 gap-4">
        {scores.map(s => (
          <Card key={s.label} className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-3xl font-bold text-emerald-400">{s.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" className="border-zinc-700">
          <Send className="mr-2 h-4 w-4" /> Submit Revision Request
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <CheckCircle2 className="mr-2 h-4 w-4" /> Approve for Production
        </Button>
      </div>
    </div>
  )
}
