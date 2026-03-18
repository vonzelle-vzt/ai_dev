"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Gift, Users, DollarSign, Check } from "lucide-react"

const mockReferrals = [
  { email: "alex@startup.com", status: "SUBSCRIBED", credit: 50, date: "Mar 10, 2026" },
  { email: "jordan@agency.io", status: "SIGNED_UP", credit: 0, date: "Mar 15, 2026" },
  { email: "sam@devshop.co", status: "PENDING", credit: 0, date: "Mar 17, 2026" },
]

const statusColors: Record<string, string> = {
  PENDING: "bg-zinc-500/10 text-zinc-400",
  SIGNED_UP: "bg-amber-500/10 text-amber-400",
  SUBSCRIBED: "bg-emerald-500/10 text-emerald-400",
  CREDITED: "bg-blue-500/10 text-blue-400",
}

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = "DEVSHOP-ABC123"
  const referralUrl = `https://devshop.ai/r/${referralCode}`

  function copyLink() {
    navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Refer & Earn</h1>
        <p className="text-zinc-400 mt-1">Earn $50 credit for every friend who subscribes.</p>
      </div>

      <Card className="bg-gradient-to-br from-blue-600/10 to-blue-600/5 border-blue-500/20">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20">
              <Gift className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Your Referral Link</h3>
              <div className="flex items-center gap-2">
                <Input value={referralUrl} readOnly className="bg-zinc-900/50 border-zinc-700 font-mono text-sm max-w-md" />
                <Button onClick={copyLink} variant="outline" className="border-zinc-700 shrink-0">
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <Users className="h-5 w-5 text-zinc-500" />
            <div>
              <p className="text-xs text-zinc-500">Total Referrals</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-zinc-500" />
            <div>
              <p className="text-xs text-zinc-500">Credits Earned</p>
              <p className="text-xl font-bold">$50.00</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-4 pb-4 flex items-center gap-3">
            <Gift className="h-5 w-5 text-zinc-500" />
            <div>
              <p className="text-xs text-zinc-500">Pending</p>
              <p className="text-xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Referral History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">Email</TableHead>
                <TableHead className="text-zinc-500">Status</TableHead>
                <TableHead className="text-zinc-500">Credit</TableHead>
                <TableHead className="text-zinc-500">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReferrals.map(r => (
                <TableRow key={r.email} className="border-zinc-800">
                  <TableCell className="font-medium">{r.email}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[r.status] + " border-0 text-xs"}>{r.status}</Badge>
                  </TableCell>
                  <TableCell className="text-zinc-400">{r.credit > 0 ? `$${r.credit}` : "—"}</TableCell>
                  <TableCell className="text-zinc-400">{r.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
