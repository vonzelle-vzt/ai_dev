import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, ExternalLink, Star } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    slug: "fitness-tracker",
    title: "Fitness Tracker SaaS",
    description: "Workout tracking with charts, goals, and social features",
    techStack: ["Next.js", "Clerk", "Neon", "Recharts"],
    thumbnail: null,
    score: 98,
  },
  {
    slug: "invoice-app",
    title: "Freelancer Invoice Tool",
    description: "Invoice creation, client management, and payment tracking",
    techStack: ["Next.js", "Stripe", "Neon", "Resend"],
    thumbnail: null,
    score: 96,
  },
  {
    slug: "ai-content-studio",
    title: "AI Content Studio",
    description: "AI-powered blog writing, SEO optimization, and scheduling",
    techStack: ["Next.js", "AI SDK", "Neon", "Clerk"],
    thumbnail: null,
    score: 97,
  },
  {
    slug: "marketplace",
    title: "Service Marketplace",
    description: "Service listings, bookings, reviews, and split payments",
    techStack: ["Next.js", "Stripe Connect", "Neon", "Algolia"],
    thumbnail: null,
    score: 95,
  },
]

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <p className="text-zinc-400 mt-1">Projects built by our AI engineering team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(p => (
          <Card key={p.slug} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors group">
            <CardContent className="pt-0 pb-5">
              <div className="h-48 rounded-t-lg bg-zinc-800 -mx-6 -mt-0 mb-4 flex items-center justify-center">
                <Code2 className="h-10 w-10 text-zinc-700 group-hover:text-zinc-600 transition-colors" />
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="flex items-center gap-1 text-xs text-zinc-400">
                  <Star className="h-3 w-3 text-amber-400" /> {p.score}
                </span>
              </div>
              <p className="text-sm text-zinc-500 mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.techStack.map(t => (
                  <Badge key={t} variant="secondary" className="bg-zinc-800 text-zinc-400 border-0 text-xs">{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
