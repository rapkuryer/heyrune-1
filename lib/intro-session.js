export const INTRO_SEEN_KEY = 'heyrune-intro-done'

export function hasSeenIntro() {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(INTRO_SEEN_KEY) === '1'
}

export function markIntroSeen() {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(INTRO_SEEN_KEY, '1')
}
