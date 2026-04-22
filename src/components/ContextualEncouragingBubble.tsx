import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const INTERACTIVE_BUBBLES: Record<string, string> = {
  '/who': 'Pick your current zone.',
  '/goal': 'Choose your next move.',
  '/time': 'Pick your daily pace.',
  '/calibration-coach': 'Your coach is ready.',
  '/calibration-goal': 'Choose what drives you.',
  '/calibration-avatar': 'Make it feel yours.',
  '/calibration-blocker': 'Spot the real blocker.',
  '/calibration-support': 'Choose your support style.',
  '/calibration-future': 'Pick your future self.',
  '/genesis-q1': 'Choose your clarity level.',
  '/genesis-q2': 'Name your next shift.',
  '/career-radar-setup': 'Set your radar right.',
  '/ai-package': 'Choose your BRAYN plan.',
}

const BUBBLE_DURATION_MS = 2000

export default function ContextualEncouragingBubble() {
  const { pathname } = useLocation()
  const message = useMemo(() => INTERACTIVE_BUBBLES[pathname] ?? null, [pathname])
  const [visible, setVisible] = useState(Boolean(message))

  useEffect(() => {
    if (!message) {
      setVisible(false)
      return
    }

    setVisible(true)
    const timeoutId = window.setTimeout(() => setVisible(false), BUBBLE_DURATION_MS)
    return () => window.clearTimeout(timeoutId)
  }, [message, pathname])

  if (!message || !visible) return null

  return (
    <div className="encouraging-bubble-shell" aria-hidden="true">
      <div className="encouraging-bubble" role="status" aria-live="polite">
        {message}
      </div>
    </div>
  )
}
