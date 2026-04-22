import type { CSSProperties, RefObject } from 'react'
import ResultShareBar from './ResultShareBar'

interface ResultActionStackProps {
  captureRef: RefObject<HTMLElement | null>
  filename: string
  shareTitle?: string
  primaryLabel: string
  onPrimaryClick: () => void
  primaryDisabled?: boolean
  style?: CSSProperties
}

export default function ResultActionStack({
  captureRef,
  filename,
  shareTitle,
  primaryLabel,
  onPrimaryClick,
  primaryDisabled = false,
  style,
}: ResultActionStackProps) {
  return (
    <div className="cta-area" style={{ width: '100%', ...style }}>
      <ResultShareBar captureRef={captureRef} filename={filename} shareTitle={shareTitle} />
      <button type="button" className="cta-btn" disabled={primaryDisabled} onClick={onPrimaryClick}>
        {primaryLabel}
      </button>
    </div>
  )
}
