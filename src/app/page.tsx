import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap, ArrowRight, FileText, Bot, Eye, Rocket,
  Building2, Palette, Code2, Server, TestTube2, Shield,
  Container, UserCheck, Check, Star,
} from "lucide-react"

const steps = [
  { icon: FileText, title: "1. Brief", desc: "Describe your app in plain language" },
  { icon: Bot, title: "2. Build", desc: "8 AI agents build it in parallel" },
  { icon: Eye, title: "3. Review", desc: "Preview staging and give feedback" },
  { icon: Rocket, title: "4. Ship", desc: "Go live in days, not months" },
]

const agents = [
  { icon: Building2, title: "Architect", desc: "System design, schema, API contracts" },
  { icon: Palette, title: "Designer", desc: "Tokens, UI, brand assets" },
  { icon: Code2, title: "Frontend", desc: "React, Next.js, shadcn/ui" },
  { icon: Server, title: "Backend", desc: "APIs, DB, auth, webhooks" },
  { icon: TestTube2, title: "QA", desc: "Tests, coverage, e2e" },
  { icon: Shield, title: "Security", desc: "OWASP, scan, audit" },
  { icon: Container, title: "DevOps", desc: "CI/CD, deploy, monitor" },
  { icon: UserCheck, title: "CTO", desc: "Human oversight & review" },
]

const plans = [
  {
    name: "Monthly",
    price: "$99",
    period: "/mo",
    features: ["2 active projects", "80 agent hrs/mo", "3 revision rounds", "Full source code", "Staging + prod", "Chat support"],
    highlighted: false,
  },
  {
    name: "Annual",
    price: "$950",
    period: "/yr",
    badge: "Save $238",
    features: ["3 active projects", "120 agent hrs/mo", "5 revision rounds", "Full source code", "Priority queue", "Priority support"],
    highlighted: true,
  },
]

const builds = [
  { name: "SaaS Dashboard", tech: "Auth + Billing + Charts", days: "4 days", hours: "12 hrs", score: "98" },
  { name: "Marketplace App", tech: "Listings + Chat + Payments", days: "6 days", hours: "28 hrs", score: "95" },
  { name: "AI Content Tool", tech: "Chat + RAG + Generation", days: "5 days", hours: "22 hrs", score: "97" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            DevShop
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#how-it-works" className="hover:text-zinc-50 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-zinc-50 transition-colors">Pricing</a>
            <a href="#examples" className="hover:text-zinc-50 transition-colors">Examples</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link href="/sign-up"><Button size="sm" className="bg-blue-600 hover:bg-blue-700">Start Building</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-0 mb-6">Your AI Engineering Team</Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Ship products,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">not prompts.</span>
          </h1>
          <p className="text-xl text-zinc-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            Submit a brief. We architect, build, test, and deploy. You review. You launch. <span className="text-zinc-200">$99/month.</span>
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link href="/sign-up">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-base">Start Building — $99/mo <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
            <Link href="#examples">
              <Button size="lg" variant="outline" className="border-zinc-700 h-12 px-8 text-base">See Examples</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 mb-4">
                  <s.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-zinc-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Team */}
      <section className="py-20 px-6 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Your AI Engineering Team</h2>
          <p className="text-zinc-400 text-center mb-12">8 specialized agents working in parallel on every project.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {agents.map(a => (
              <Card key={a.title} className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-5 pb-5 text-center">
                  <a.icon className="h-6 w-6 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-medium text-sm mb-1">{a.title}</h3>
                  <p className="text-xs text-zinc-500">{a.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {plans.map(p => (
              <Card key={p.name} className={`bg-zinc-900 ${p.highlighted ? "border-blue-500/50 ring-1 ring-blue-500/20" : "border-zinc-800"}`}>
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    {p.badge && <Badge className="bg-blue-500/10 text-blue-400 border-0 text-xs">{p.badge}</Badge>}
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold">{p.price}</span>
                    <span className="text-zinc-500">{p.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                        <Check className="h-4 w-4 text-blue-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up">
                    <Button className={`w-full ${p.highlighted ? "bg-blue-600 hover:bg-blue-700" : "bg-zinc-800 hover:bg-zinc-700"}`}>Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Builds */}
      <section id="examples" className="py-20 px-6 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Builds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {builds.map(b => (
              <Card key={b.name} className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-5 pb-5">
                  <div className="h-32 rounded-lg bg-zinc-800 mb-4 flex items-center justify-center">
                    <Code2 className="h-8 w-8 text-zinc-600" />
                  </div>
                  <h3 className="font-semibold mb-1">{b.name}</h3>
                  <p className="text-xs text-zinc-500 mb-3">{b.tech}</p>
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span>Built in {b.days}</span>
                    <span>{b.hours}</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" /> {b.score}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600">
              <Zap className="h-3 w-3 text-white" />
            </div>
            DevShop — &copy; 2026
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/pricing" className="hover:text-zinc-300">Pricing</Link>
            <Link href="/portfolio" className="hover:text-zinc-300">Portfolio</Link>
            <Link href="/sign-in" className="hover:text-zinc-300">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
