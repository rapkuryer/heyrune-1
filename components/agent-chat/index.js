import cn from 'clsx'
import { Button } from 'components/button'
import { agent } from 'content/agent-knowledge'
import {
  clearStoredMessages,
  getUserId,
  getUserQueries,
  loadStoredMessages,
  saveStoredMessages,
} from 'lib/agent-storage'
import { useCallback, useEffect, useRef, useState } from 'react'
import s from './agent-chat.module.scss'
import { AssistantMessage } from './typing-message'

function createMessage(role, content, { animate = false } = {}) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: Date.now(),
    animate,
  }
}

const WELCOME = createMessage(
  'assistant',
  `Hey — I'm ${agent.name}. Ask me about Base, the ecosystem, DeFi, AI agents, or the heyrune museum.`
)

export function AgentChat() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState(false)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState(null)
  const [hydrated, setHydrated] = useState(false)
  const listRef = useRef(null)
  const messageRefs = useRef({})
  const stickToBottomRef = useRef(true)

  function isNearBottom(element, threshold = 80) {
    if (!element) return true
    return (
      element.scrollHeight - element.scrollTop - element.clientHeight <=
      threshold
    )
  }

  const scrollToBottom = useCallback((behavior = 'auto') => {
    const element = listRef.current
    if (!element) return
    element.scrollTo({ top: element.scrollHeight, behavior })
  }, [])

  const scrollToMessage = useCallback((id) => {
    messageRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  useEffect(() => {
    setUserId(getUserId())
    const stored = loadStoredMessages()
    if (stored?.length) {
      setMessages(stored.map((message) => ({ ...message, animate: false })))
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveStoredMessages(
      messages.map(({ role, content, id, createdAt }) => ({
        role,
        content,
        id,
        createdAt,
      }))
    )
  }, [messages, hydrated])

  useEffect(() => {
    function onScroll() {
      stickToBottomRef.current = isNearBottom(listRef.current)
    }

    const element = listRef.current
    element?.addEventListener('scroll', onScroll, { passive: true })
    return () => element?.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (stickToBottomRef.current) {
      scrollToBottom(typing ? 'auto' : 'smooth')
    }
  }, [messages, loading, typing, scrollToBottom])

  const handleTypingTick = useCallback(() => {
    if (stickToBottomRef.current) {
      scrollToBottom('auto')
    }
  }, [scrollToBottom])

  async function sendMessage(text) {
    const content = text.trim()
    if (!content || loading || typing) return

    setError('')
    setInput('')
    stickToBottomRef.current = true

    const userMessage = createMessage('user', content)
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setLoading(true)

    requestAnimationFrame(() => scrollToBottom('smooth'))

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          messages: nextMessages.map(({ role, content: body }) => ({
            role,
            content: body,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setLoading(false)
      setTyping(true)
      setMessages((current) => [
        ...current,
        createMessage('assistant', data.message, { animate: true }),
      ])
    } catch (err) {
      setError(err.message)
      setMessages((current) => current.slice(0, -1))
      setInput(content)
      setLoading(false)
    }
  }

  function handleTypingComplete() {
    setTyping(false)
    setMessages((current) =>
      current.map((message) =>
        message.animate ? { ...message, animate: false } : message
      )
    )
  }

  function handleClearHistory() {
    clearStoredMessages()
    setMessages([WELCOME])
    setError('')
    setInput('')
    setTyping(false)
    setLoading(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage(input)
  }

  const queries = getUserQueries(messages)
  const showSuggestions =
    hydrated && messages.length <= 1 && !loading && !typing

  return (
    <div className={s.layout}>
      <aside className={s.history}>
        <div className={s.historyHeader}>
          <p className={cn('h4', s.historyTitle)}>Your history</p>
          {queries.length > 0 && (
            <button
              type="button"
              className={cn('p-xs', s.historyClear)}
              onClick={handleClearHistory}
            >
              Clear
            </button>
          )}
        </div>
        <p className={cn('p-xs', s.historyMeta)}>
          Saved on this device
          {userId && (
            <>
              <br />
              <span className={s.historyId}>{userId.slice(0, 8)}</span>
            </>
          )}
        </p>
        <ul className={s.historyList}>
          {queries.length === 0 && (
            <li className={cn('p-xs', s.historyEmpty)}>No questions yet</li>
          )}
          {queries.map((query) => (
            <li key={query.id}>
              <button
                type="button"
                className={s.historyItem}
                onClick={() => scrollToMessage(query.id)}
              >
                <span className={cn('p-xs', s.historyTime)}>
                  {new Date(query.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span className="p">{query.content}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className={s.chat}>
        <div className={s.header}>
          <p className={cn('h4', s.headerTitle)}>{agent.name}</p>
          <p className={cn('p-xs', s.headerStatus)}>
            {loading ? 'Thinking…' : typing ? 'Typing…' : 'Online · Base expert'}
          </p>
        </div>

        <div className={s.messages} ref={listRef} data-lenis-prevent>
          {messages.map((message) => (
            <div
              key={message.id}
              ref={(node) => {
                messageRefs.current[message.id] = node
              }}
              className={cn(
                s.message,
                message.role === 'user' ? s.user : s.assistant,
                message.role === 'assistant' && s.assistantText
              )}
            >
              {message.role === 'assistant' ? (
                <AssistantMessage
                  message={message}
                  animate={message.animate}
                  onTyped={handleTypingComplete}
                  onTick={handleTypingTick}
                />
              ) : (
                message.content
              )}
            </div>
          ))}
          {loading && <p className={cn(s.message, s.typing)}>…</p>}
        </div>

        {showSuggestions && (
          <div className={s.suggestions}>
            {agent.suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                className={s.suggestion}
                onClick={() => sendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {error && <p className={cn('p-xs', s.error)}>{error}</p>}

        <form className={s.form} onSubmit={handleSubmit}>
          <textarea
            className={s.input}
            value={input}
            rows={1}
            placeholder="Ask about Base or heyrune…"
            disabled={loading || typing}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                sendMessage(input)
              }
            }}
          />
          <Button
            className={s.send}
            arrow
            type="submit"
            disabled={loading || typing || !input.trim()}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}
