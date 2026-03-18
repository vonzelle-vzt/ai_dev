"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Check, Sparkles, Upload, Palette, Plug, Send } from "lucide-react"

const STEPS = [
  { label: "Basics", icon: Sparkles },
  { label: "Features", icon: Check },
  { label: "Design", icon: Palette },
  { label: "Integrations", icon: Plug },
  { label: "Review", icon: Send },
]

const FEATURE_CATALOG = {
  "Authentication": [
    { id: "auth-email", label: "Email/password login", complexity: 2 },
    { id: "auth-google", label: "Google OAuth", complexity: 1 },
    { id: "auth-github", label: "GitHub OAuth", complexity: 1 },
    { id: "auth-magic", label: "Magic link", complexity: 2 },
    { id: "auth-mfa", label: "Multi-factor auth", complexity: 3 },
  ],
  "Payments": [
    { id: "pay-checkout", label: "Stripe checkout", complexity: 3 },
    { id: "pay-subscription", label: "Subscription billing", complexity: 4 },
    { id: "pay-metering", label: "Usage metering", complexity: 4 },
    { id: "pay-payouts", label: "Marketplace payouts", complexity: 5 },
  ],
  "Data & Display": [
    { id: "data-dashboard", label: "Dashboard with charts", complexity: 3 },
    { id: "data-tables", label: "Data tables with filters", complexity: 2 },
    { id: "data-upload", label: "File uploads", complexity: 2 },
    { id: "data-search", label: "Search & filtering", complexity: 3 },
    { id: "data-infinite", label: "Infinite scroll", complexity: 2 },
  ],
  "AI Features": [
    { id: "ai-chat", label: "Chat interface", complexity: 4 },
    { id: "ai-recommend", label: "Recommendations", complexity: 4 },
    { id: "ai-content", label: "Content generation", complexity: 3 },
    { id: "ai-image", label: "Image generation", complexity: 4 },
    { id: "ai-rag", label: "Knowledge base / RAG", complexity: 5 },
  ],
  "Communication": [
    { id: "comm-email", label: "Email notifications", complexity: 2 },
    { id: "comm-push", label: "Push notifications", complexity: 3 },
    { id: "comm-messaging", label: "In-app messaging", complexity: 4 },
    { id: "comm-webhooks", label: "Webhooks", complexity: 3 },
  ],
  "Admin": [
    { id: "admin-panel", label: "Admin dashboard", complexity: 3 },
    { id: "admin-users", label: "User management", complexity: 3 },
    { id: "admin-analytics", label: "Analytics", complexity: 3 },
    { id: "admin-audit", label: "Audit logs", complexity: 2 },
  ],
}

const STYLE_PRESETS = [
  { id: "modern", label: "Modern Minimal", desc: "Clean lines, whitespace, subtle shadows" },
  { id: "bold", label: "Bold & Vibrant", desc: "Strong colors, large type, high contrast" },
  { id: "corporate", label: "Corporate", desc: "Professional, structured, trustworthy" },
  { id: "dark", label: "Dark Mode", desc: "Dark backgrounds, neon accents, sleek" },
  { id: "playful", label: "Playful", desc: "Rounded shapes, bright colors, fun" },
  { id: "brutalist", label: "Brutalist", desc: "Raw, bold typography, unconventional" },
]

export default function NewProjectPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [referenceUrls, setReferenceUrls] = useState<string[]>([""])
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set())
  const [customFeatures, setCustomFeatures] = useState("")
  const [style, setStyle] = useState("modern")
  const [primaryColor, setPrimaryColor] = useState("#3b82f6")
  const [integrationNotes, setIntegrationNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const featureCount = selectedFeatures.size
  const totalComplexity = Object.values(FEATURE_CATALOG)
    .flat()
    .filter(f => selectedFeatures.has(f.id))
    .reduce((sum, f) => sum + f.complexity, 0)
  const score = Math.min(10, Math.round((totalComplexity / 4) * 10) / 10)
  const estDays = score <= 2 ? 3 : score <= 4 ? 4 : score <= 6 ? 6 : score <= 8 ? 10 : 14

  function toggleFeature(id: string) {
    const next = new Set(selectedFeatures)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedFeatures(next)
  }

  async function handleSubmit() {
    setSubmitting(true)
    // In production this would call a server action
    setTimeout(() => router.push("/dashboard"), 1500)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Project Brief</h1>
        <p className="text-zinc-400 mt-1">Describe your app and our AI team will build it.</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1">
            <button
              onClick={() => i < step && setStep(i)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                i === step ? "text-blue-400" : i < step ? "text-zinc-300" : "text-zinc-600"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                i === step ? "bg-blue-600 text-white" : i < step ? "bg-blue-600/20 text-blue-400" : "bg-zinc-800 text-zinc-600"
              )}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={cn("flex-1 h-px mx-2", i < step ? "bg-blue-600/40" : "bg-zinc-800")} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="pt-6">
          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project name *</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="My Awesome App" className="bg-zinc-800 border-zinc-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Describe your app *</Label>
                <Textarea id="desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="A SaaS platform that helps freelancers track invoices and manage clients..." rows={4} className="bg-zinc-800 border-zinc-700" />
              </div>
              <div className="space-y-2">
                <Label>Reference URLs (optional)</Label>
                {referenceUrls.map((url, i) => (
                  <Input key={i} value={url} onChange={e => { const next = [...referenceUrls]; next[i] = e.target.value; setReferenceUrls(next) }} placeholder="https://example.com" className="bg-zinc-800 border-zinc-700" />
                ))}
                {referenceUrls.length < 5 && (
                  <Button variant="ghost" size="sm" onClick={() => setReferenceUrls([...referenceUrls, ""])} className="text-zinc-500">+ Add URL</Button>
                )}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <p className="text-sm text-zinc-400">Select the features your app needs.</p>
              {Object.entries(FEATURE_CATALOG).map(([category, features]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-zinc-300 mb-2">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map(f => (
                      <label key={f.id} className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                        selectedFeatures.has(f.id) ? "border-blue-500/50 bg-blue-500/5" : "border-zinc-800 hover:border-zinc-700"
                      )}>
                        <Checkbox checked={selectedFeatures.has(f.id)} onCheckedChange={() => toggleFeature(f.id)} />
                        <span className="text-sm">{f.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="space-y-2">
                <Label>Custom features</Label>
                <Textarea value={customFeatures} onChange={e => setCustomFeatures(e.target.value)} placeholder="Describe any additional features..." rows={3} className="bg-zinc-800 border-zinc-700" />
              </div>
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Complexity: {score}/10</p>
                      <p className="text-xs text-zinc-500">{featureCount} features selected — Est. {estDays} days</p>
                    </div>
                    <Badge variant="secondary" className={cn(
                      "border-0",
                      score <= 3 ? "bg-emerald-500/10 text-emerald-400" :
                      score <= 6 ? "bg-amber-500/10 text-amber-400" :
                      "bg-red-500/10 text-red-400"
                    )}>
                      {score <= 3 ? "Low" : score <= 6 ? "Medium" : "High"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-400">Choose a style direction for your app.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STYLE_PRESETS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={cn(
                      "rounded-lg border p-4 text-left transition-colors",
                      style === s.id ? "border-blue-500 bg-blue-500/5" : "border-zinc-800 hover:border-zinc-700"
                    )}
                  >
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-zinc-500 mt-1">{s.desc}</p>
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Primary color</Label>
                <div className="flex items-center gap-3">
                  <input type="color" id="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="h-10 w-10 rounded border-0 cursor-pointer" />
                  <Input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="bg-zinc-800 border-zinc-700 max-w-[140px] font-mono text-sm" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-400">Any specific integrations or technical requirements?</p>
              <Textarea value={integrationNotes} onChange={e => setIntegrationNotes(e.target.value)} placeholder="I need Shopify webhooks, Twilio for SMS, custom API for inventory..." rows={6} className="bg-zinc-800 border-zinc-700" />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-medium">Review Your Brief</h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-zinc-800/50 p-4">
                  <p className="text-xs text-zinc-500 mb-1">Project</p>
                  <p className="font-medium">{name || "—"}</p>
                  <p className="text-sm text-zinc-400 mt-1">{description || "—"}</p>
                </div>
                <div className="rounded-lg bg-zinc-800/50 p-4">
                  <p className="text-xs text-zinc-500 mb-1">Features ({featureCount})</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {Object.values(FEATURE_CATALOG).flat().filter(f => selectedFeatures.has(f.id)).map(f => (
                      <Badge key={f.id} variant="secondary" className="bg-zinc-700 text-zinc-300 border-0 text-xs">{f.label}</Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-zinc-800/50 p-4">
                  <p className="text-xs text-zinc-500 mb-1">Design</p>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded" style={{ backgroundColor: primaryColor }} />
                    <span className="text-sm">{STYLE_PRESETS.find(s => s.id === style)?.label}</span>
                  </div>
                </div>
                <div className="rounded-lg bg-zinc-800/50 p-4">
                  <p className="text-xs text-zinc-500 mb-1">Estimate</p>
                  <p className="text-sm">Complexity {score}/10 — ~{estDays} days</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => step > 0 ? setStep(step - 1) : router.back()} className="border-zinc-700">
          <ArrowLeft className="mr-2 h-4 w-4" /> {step === 0 ? "Cancel" : "Back"}
        </Button>
        {step < 4 ? (
          <Button onClick={() => setStep(step + 1)} className="bg-blue-600 hover:bg-blue-700" disabled={step === 0 && !name.trim()}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Brief"} <Send className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
