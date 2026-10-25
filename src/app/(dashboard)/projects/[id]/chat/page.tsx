"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles } from "lucide-react"

const mockMessages = [
  { id: 1, sender: "SYSTEM", content: "Project 'Fitness Tracker SaaS' created. AI CTO is reviewing your brief.", time: "1:00 PM" },
  { id: 2, sender: "CTO", content: "I've reviewed your brief. The architecture looks solid — Next.js with Neon Postgres, Clerk auth, and Recharts for the dashboard. I'm dispatching the build agents now.", time: "1:15 PM" },
  { id: 3, sender: "AGENT", content: "Architecture phase complete. Generated schema with 8 tables, 12 API routes, and 15 page components. Starting build phase.", time: "1:45 PM" },
  { id: 4, sender: "CLIENT", content: "Can we make the dashboard charts show weekly data by default instead of daily?", time: "2:00 PM" },
  { id: 5, sender: "CTO", content: "Absolutely. I'll note that for the frontend agent. The chart component will default to weekly aggregation with a toggle for daily/weekly/monthly views.", time: "2:02 PM" },
  { id: 6, sender: "AGENT", content: "Frontend agent: Dashboard layout complete. 4 chart components created with weekly default view. Moving to workout log table.", time: "2:14 PM" },
]

const senderConfig: Record<string, { icon: typeof User; color: string; name: string }> = {
  CLIENT: { icon: User, color: "bg-blue-600", name: "You" },
  CTO: { icon: Sparkles, color: "bg-purple-600", name: "AI CTO" },
  AGENT: { icon: Bot, color: "bg-emerald-600", name: "Agent" },
  SYSTEM: { icon: Bot, color: "bg-zinc-600", name: "System" },
}

export default function ProjectChatPage() {
  const [message, setMessage] = useState("")

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Project Chat</h1>
          <p className="text-zinc-400 text-sm">Fitness Tracker SaaS</p>
        </div>
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-0">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5" />
          AI CTO Online
        </Badge>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {mockMessages.map(msg => {
              const config = senderConfig[msg.sender]
              const isClient = msg.sender === "CLIENT"
              return (
                <div key={msg.id} className={`flex gap-3 ${isClient ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className={config.color}>
                      <config.icon className="h-4 w-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[70%] ${isClient ? "text-right" : ""}`}>
                    <div className={`flex items-center gap-2 mb-1 ${isClient ? "justify-end" : ""}`}>
                      <span className="text-xs font-medium text-zinc-400">{config.name}</span>
                      <span className="text-xs text-zinc-600">{msg.time}</span>
                    </div>
                    <div className={`rounded-lg p-3 text-sm ${
                      isClient
                        ? "bg-blue-600 text-white"
                        : msg.sender === "SYSTEM"
                        ? "bg-zinc-800/50 text-zinc-400 text-xs"
                        : "bg-zinc-800 text-zinc-200"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        <div className="border-t border-zinc-800 p-4">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Ask the AI CTO anything about your project..."
              className="bg-zinc-800 border-zinc-700"
              onKeyDown={e => e.key === "Enter" && message.trim() && setMessage("")}
            />
            <Button className="bg-blue-600 hover:bg-blue-700 shrink-0" disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
