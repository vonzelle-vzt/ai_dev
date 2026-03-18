"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useOrganizationList } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"

export default function OnboardingPage() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { createOrganization } = useOrganizationList()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !createOrganization) return
    setLoading(true)
    try {
      await createOrganization({ name: name.trim() })
      router.push("/dashboard")
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
            <Building2 className="h-6 w-6 text-blue-500" />
          </div>
          <CardTitle className="text-xl">Create your workspace</CardTitle>
          <CardDescription className="text-zinc-400">
            This is where your projects will live.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace name</Label>
              <Input
                id="name"
                placeholder="Acme Inc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? "Creating..." : "Create Workspace"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
