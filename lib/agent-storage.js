const USER_KEY = 'heyrune-agent-user-id'
const HISTORY_KEY = 'heyrune-agent-history'

export function getUserId() {
  if (typeof window === 'undefined') return null

  let id = localStorage.getItem(USER_KEY)
  if (!id) {
    id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `user-${Date.now()}`
    localStorage.setItem(USER_KEY, id)
  }

  return id
}

export function loadStoredMessages() {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return null

    const data = JSON.parse(raw)
    if (data.userId !== getUserId() || !Array.isArray(data.messages)) {
      return null
    }

    return data.messages
  } catch {
    return null
  }
}

export function saveStoredMessages(messages) {
  if (typeof window === 'undefined') return

  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify({
      userId: getUserId(),
      messages,
      updatedAt: Date.now(),
    })
  )
}

export function clearStoredMessages() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(HISTORY_KEY)
}

export function getUserQueries(messages) {
  return messages
    .filter((message) => message.role === 'user')
    .map((message) => ({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
    }))
    .reverse()
}
