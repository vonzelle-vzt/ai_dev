import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function OrgSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Organization Settings</h1>
        <p className="text-zinc-400 mt-1">Manage your workspace and team members.</p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">Workspace name</Label>
            <Input id="orgName" placeholder="Acme Inc." className="bg-zinc-800 border-zinc-700 max-w-sm" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Team Members</CardTitle>
            <Button size="sm" variant="outline" className="border-zinc-700">Invite Member</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">Name</TableHead>
                <TableHead className="text-zinc-500">Email</TableHead>
                <TableHead className="text-zinc-500">Role</TableHead>
                <TableHead className="text-zinc-500"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-zinc-800">
                <TableCell className="font-medium">You</TableCell>
                <TableCell className="text-zinc-400">you@example.com</TableCell>
                <TableCell><Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-0">Admin</Badge></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
