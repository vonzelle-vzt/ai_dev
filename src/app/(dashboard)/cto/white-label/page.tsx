import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Globe, Palette, Upload, Eye } from "lucide-react"

export default function WhiteLabelPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">White-Label Settings</h1>
          <p className="text-zinc-400 mt-1">Customize branding for your clients.</p>
        </div>
        <Button variant="outline" className="border-zinc-700">
          <Eye className="mr-2 h-4 w-4" /> Preview
        </Button>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="h-5 w-5 text-blue-400" /> Branding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input placeholder="Your Agency Name" className="bg-zinc-800 border-zinc-700 max-w-sm" />
          </div>
          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <Upload className="h-6 w-6 text-zinc-600" />
              </div>
              <Button variant="outline" size="sm" className="border-zinc-700">Upload Logo</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex items-center gap-2">
                <input type="color" defaultValue="#3b82f6" className="h-10 w-10 rounded border-0 cursor-pointer" />
                <Input defaultValue="#3b82f6" className="bg-zinc-800 border-zinc-700 font-mono text-sm max-w-[140px]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <div className="flex items-center gap-2">
                <input type="color" defaultValue="#10b981" className="h-10 w-10 rounded border-0 cursor-pointer" />
                <Input defaultValue="#10b981" className="bg-zinc-800 border-zinc-700 font-mono text-sm max-w-[140px]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-400" /> Custom Domain
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Custom Domain</Label>
            <Input placeholder="app.youragency.com" className="bg-zinc-800 border-zinc-700 max-w-sm" />
            <p className="text-xs text-zinc-500">Point a CNAME record to cname.vercel-dns.com</p>
          </div>
          <div className="flex items-center gap-3">
            <Switch />
            <Label>Enable custom domain</Label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Email Branding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>From Name</Label>
            <Input placeholder="Your Agency" className="bg-zinc-800 border-zinc-700 max-w-sm" />
          </div>
          <div className="space-y-2">
            <Label>From Domain</Label>
            <Input placeholder="notifications@youragency.com" className="bg-zinc-800 border-zinc-700 max-w-sm" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
    </div>
  )
}
