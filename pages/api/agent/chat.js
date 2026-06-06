import { buildAgentSystemPrompt } from 'content/agent-knowledge'

const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 2000

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(503).json({
      error:
        'Agent is not configured. Add OPENAI_API_KEY to your environment variables.',
    })
  }

  const { messages } = req.body ?? {}

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' })
  }

  const trimmed = messages.slice(-MAX_MESSAGES).filter((message) => {
    return (
      message &&
      (message.role === 'user' || message.role === 'assistant') &&
      typeof message.content === 'string' &&
      message.content.trim().length > 0 &&
      message.content.length <= MAX_MESSAGE_LENGTH
    )
  })

  if (trimmed.length === 0 || trimmed[trimmed.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Last message must be from the user' })
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        max_tokens: 1024,
        messages: [
          { role: 'system', content: buildAgentSystemPrompt() },
          ...trimmed.map(({ role, content }) => ({ role, content: content.trim() })),
        ],
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('OpenAI API error:', response.status, errorBody)
      return res.status(502).json({ error: 'AI provider returned an error. Try again.' })
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from AI provider' })
    }

    return res.status(200).json({ message: reply })
  } catch (error) {
    console.error('Agent chat error:', error)
    return res.status(500).json({ error: 'Failed to reach AI provider' })
  }
}
