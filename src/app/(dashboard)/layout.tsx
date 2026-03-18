import { Sidebar } from "@/components/shared/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar />
      <main className="pl-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
