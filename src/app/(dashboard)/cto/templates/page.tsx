import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ShoppingBag, FileText, Store, Wrench, Bot, Star } from "lucide-react"

const templates = [
  {
    slug: "saas-dashboard",
    name: "SaaS Dashboard",
    description: "Auth + billing + admin panel + data tables + charts",
    icon: LayoutDashboard,
    category: "SAAS",
    estDays: 4,
    usage: 38,
    successRate: 96,
  },
  {
    slug: "marketplace",
    name: "Marketplace",
    description: "Listings + search + payments + messaging + reviews",
    icon: Store,
    category: "MARKETPLACE",
    estDays: 7,
    usage: 22,
    successRate: 93,
  },
  {
    slug: "landing-page",
    name: "Landing Page",
    description: "Hero + features + pricing + CTA + waitlist form",
    icon: FileText,
    category: "LANDING_PAGE",
    estDays: 2,
    usage: 18,
    successRate: 99,
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    description: "Products + cart + checkout + orders + shipping",
    icon: ShoppingBag,
    category: "ECOMMERCE",
    estDays: 6,
    usage: 15,
    successRate: 94,
  },
  {
    slug: "internal-tool",
    name: "Internal Tool",
    description: "CRUD + RBAC + reporting + data import/export",
    icon: Wrench,
    category: "INTERNAL_TOOL",
    estDays: 5,
    usage: 12,
    successRate: 97,
  },
  {
    slug: "ai-app",
    name: "AI App",
    description: "Chat interface + tool calling + RAG + agent workflows",
    icon: Bot,
    category: "AI_APP",
    estDays: 5,
    usage: 10,
    successRate: 91,
  },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Project Templates</h1>
          <p className="text-zinc-400 mt-1">Pre-built starting points that accelerate builds.</p>
        </div>
        <Button variant="outline" className="border-zinc-700">Create Template</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(t => (
          <Card key={t.slug} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                  <t.icon className="h-5 w-5 text-blue-400" />
                </div>
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 border-0 text-xs">{t.category}</Badge>
              </div>
              <h3 className="font-semibold mb-1">{t.name}</h3>
              <p className="text-xs text-zinc-500 mb-4">{t.description}</p>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span>~{t.estDays} days</span>
                <span>{t.usage}% of projects</span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-400" /> {t.successRate}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
