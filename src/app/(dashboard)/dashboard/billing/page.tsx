import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, ExternalLink } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-zinc-400 mt-1">Manage your subscription and view invoices.</p>
      </div>

      {/* Current Plan */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Monthly Plan
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-0">Active</Badge>
              </CardTitle>
              <CardDescription className="mt-1 text-zinc-400">$99/month — Renews on Apr 18, 2026</CardDescription>
            </div>
            <Button variant="outline" className="border-zinc-700 text-zinc-300">
              <CreditCard className="mr-2 h-4 w-4" /> Manage Subscription
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Usage */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">This Billing Period</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">Agent Hours</span>
              <span>0 / 80 hrs</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">Active Projects</span>
              <span>0 / 2</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Add-ons */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Add-ons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
            <div>
              <p className="font-medium text-sm">Extra Project Slot</p>
              <p className="text-xs text-zinc-500">Add one more active project</p>
            </div>
            <Button size="sm" variant="outline" className="border-zinc-700">$29/mo</Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
            <div>
              <p className="font-medium text-sm">Priority Queue</p>
              <p className="text-xs text-zinc-500">Your projects build first</p>
            </div>
            <Button size="sm" variant="outline" className="border-zinc-700">$49/mo</Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">Date</TableHead>
                <TableHead className="text-zinc-500">Description</TableHead>
                <TableHead className="text-zinc-500">Amount</TableHead>
                <TableHead className="text-zinc-500">Status</TableHead>
                <TableHead className="text-zinc-500"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-zinc-800">
                <TableCell className="text-zinc-400">Mar 18, 2026</TableCell>
                <TableCell>Monthly subscription</TableCell>
                <TableCell>$99.00</TableCell>
                <TableCell><Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-0">Paid</Badge></TableCell>
                <TableCell><Button variant="ghost" size="sm"><ExternalLink className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
