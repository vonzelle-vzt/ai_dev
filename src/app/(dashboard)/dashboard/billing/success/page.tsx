import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function BillingSuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="bg-zinc-900 border-zinc-800 max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">Subscription Active!</h2>
          <p className="text-zinc-400 text-sm mb-6">Your plan is now active. Start building your first project.</p>
          <Link href="/dashboard/projects/new">
            <Button className="bg-blue-600 hover:bg-blue-700">Create Your First Project</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
