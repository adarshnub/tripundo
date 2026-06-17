'use client'

import { useEffect, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import ChatThread from '@/components/app/ChatThread'
import { getBootstrap } from '@/lib/tripundo-api'

export default function MessagesPage() {
  const [data, setData] = useState(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    getBootstrap().then((bootstrap) => {
      const conversations = [
        ...bootstrap.communities.map((community) => ({ id: community.id, type: 'Community', title: community.name, messages: community.messages || [] })),
        ...bootstrap.trips.map((trip) => ({ id: trip.id, type: 'Trip Plan', title: trip.title, messages: trip.chatMessages || [] })),
      ]
      setData({ ...bootstrap, conversations })
      setActive(conversations[0])
    })
  }, [])

  const activeConversation = useMemo(() => data?.conversations?.find((item) => item.id === active?.id) || active, [active, data])

  if (!data || !activeConversation) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-emerald-300" /></div>

  return (
    <div className="h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-white">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={32} minSize={24}>
          <div className="h-full overflow-y-auto border-r border-white/10 p-3">
            <div className="px-2 pb-3 text-xs uppercase tracking-widest text-white/45">Messages</div>
            <div className="space-y-2">
              {data.conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setActive(conversation)}
                  className={`w-full rounded-xl px-3 py-3 text-left ${activeConversation.id === conversation.id ? 'bg-white text-emerald-950' : 'bg-black/20 text-white/70 hover:bg-white/10'}`}
                >
                  <div className="text-xs uppercase tracking-wider opacity-60">{conversation.type}</div>
                  <div className="mt-1 text-sm font-semibold">{conversation.title}</div>
                </button>
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={68}>
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 p-4">
              <div className="text-xs uppercase tracking-widest text-emerald-300/70">{activeConversation.type}</div>
              <h1 className="mt-1 text-2xl font-semibold">{activeConversation.title}</h1>
            </div>
            <div className="min-h-0 flex-1 p-4">
              <ChatThread messages={activeConversation.messages} profiles={data.profiles} currentUser={data.currentUser} onSend={async () => {}} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
