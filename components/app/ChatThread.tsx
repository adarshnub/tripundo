'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ChatThread({ messages = [], profiles = [], currentUser, onSend, placeholder = 'Write a message...' }) {
  const [draft, setDraft] = useState('')

  async function submit(event) {
    event.preventDefault()
    if (!draft.trim()) return
    await onSend?.(draft.trim())
    setDraft('')
  }

  return (
    <div className="flex min-h-[480px] flex-col rounded-2xl border border-white/10 bg-white/[0.04] text-white">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message) => {
          const author = profiles.find((profile) => profile.id === message.authorId) || currentUser
          return (
            <div key={message.id} className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--sand))] text-xs font-bold text-emerald-950">
                  {author?.initials || '?'}
                </div>
                <div>
                  <div className="text-sm font-semibold text-emerald-100">{author?.name || 'Traveler'}</div>
                  <div className="text-[11px] text-white/35">{message.createdAt ? new Date(message.createdAt).toLocaleString() : 'now'}</div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{message.body}</p>
            </div>
          )
        })}
      </div>
      <form onSubmit={submit} className="flex gap-2 border-t border-white/10 p-3">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm outline-none placeholder:text-white/35"
        />
        <Button className="rounded-full bg-[hsl(var(--sunlight))] text-emerald-950 hover:bg-[hsl(var(--sand))]">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
