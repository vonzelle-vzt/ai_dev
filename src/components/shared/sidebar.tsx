"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { LayoutDashboard, FolderKanban, CreditCard, Settings, Bot, Shield, BarChart3, Zap } from "lucide-react"

const clientNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects/new", icon: FolderKanban },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/settings/org", icon: Settings },
]

const ctoNav = [
  { label: "Review Queue", href: "/cto/review-queue", icon: Shield },
  { label: "Swarm Control", href: "/cto/swarm", icon: Bot },
  { label: "Analytics", href: "/cto/analytics", icon: BarChart3 },
  { label: "Research", href: "/cto/research", icon: Zap },
  { label: "Observability", href: "/cto/observability", icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col">
      <div className="flex h-14 items-center border-b border-zinc-800 px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-lg">DevShop</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="px-3 mb-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">Client</p>
          <div className="space-y-1">
            {clientNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-zinc-800 text-blue-400"
                    : "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 mb-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">CTO</p>
          <div className="space-y-1">
            {ctoNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-zinc-800 text-blue-400"
                    : "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="border-t border-zinc-800 p-4 space-y-3">
        <OrganizationSwitcher
          appearance={{
            elements: {
              rootBox: "w-full",
              organizationSwitcherTrigger: "w-full justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm",
            },
          }}
        />
        <div className="flex items-center gap-2">
          <UserButton
            appearance={{
              elements: { avatarBox: "h-8 w-8" },
            }}
          />
          <span className="text-sm text-zinc-400">Account</span>
        </div>
      </div>
    </aside>
  )
}
