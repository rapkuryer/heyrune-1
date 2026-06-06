import { useEffect, useRef, useState } from 'react'
import s from './agent-chat.module.scss'

function getTypingDelay(char, prevChar) {
  if (char === '\n') return 35 + Math.random() * 25
  if ('.!?'.includes(char)) return 70 + Math.random() * 40
  if (char === ',') return 45 + Math.random() * 20
  if (char === ' ') return 6 + Math.random() * 8
  if (prevChar === '\n') return 20 + Math.random() * 15
  return 10 + Math.random() * 14
}

export function TypingMessage({ text, onComplete, onTick }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const onCompleteRef = useRef(onComplete)
  const onTickRef = useRef(onTick)

  onCompleteRef.current = onComplete
  onTickRef.current = onTick

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    let index = 0
    let timeoutId

    function typeNext() {
      if (index >= text.length) {
        setDone(true)
        onCompleteRef.current?.()
        return
      }

      index += 1
      setDisplayed(text.slice(0, index))
      onTickRef.current?.()

      const char = text[index - 1]
      const prevChar = index > 1 ? text[index - 2] : ''
      timeoutId = setTimeout(typeNext, getTypingDelay(char, prevChar))
    }

    timeoutId = setTimeout(typeNext, 120)

    return () => clearTimeout(timeoutId)
  }, [text])

  return (
    <>
      {displayed}
      {!done && <span className={s.cursor} aria-hidden="true" />}
    </>
  )
}

export function AssistantMessage({ message, animate, onTyped, onTick }) {
  if (animate) {
    return (
      <TypingMessage
        text={message.content}
        onComplete={onTyped}
        onTick={onTick}
      />
    )
  }

  return message.content
}
