import { useRef, useState } from 'react'
import type { RefObject } from 'react'
import { captureElement, downloadBlob, shareBlob } from '../utils/captureAndShare'

interface ResultShareBarProps {
  /** Ref pointing to the DOM node that will be captured. */
  captureRef: RefObject<HTMLElement | null>
  /** Clean filename without path, e.g. "brayn-proof.png". */
  filename: string
  /** Optional title used by the native share sheet. */
  shareTitle?: string
}

/**
 * Reusable Download + Share action bar for all success / proof / artifact screens.
 * Drop this inside a .cta-area before the primary CTA button.
 */
export default function ResultShareBar({
  captureRef,
  filename,
  shareTitle,
}: ResultShareBarProps) {
  const [busy, setBusy] = useState<'download' | 'share' | null>(null)
  // Cache the last captured blob so Download and Share reuse the same image
  const blobCache = useRef<Blob | null>(null)

  async function getBlob(): Promise<Blob> {
    if (blobCache.current) return blobCache.current
    if (!captureRef.current) throw new Error('Capture target not mounted')
    const blob = await captureElement(captureRef.current)
    blobCache.current = blob
    return blob
  }

  async function handleDownload() {
    if (busy) return
    setBusy('download')
    try {
      const blob = await getBlob()
      downloadBlob(blob, filename)
    } catch (err) {
      console.error('[ResultShareBar] Download failed:', err)
    } finally {
      setBusy(null)
    }
  }

  async function handleShare() {
    if (busy) return
    setBusy('share')
    try {
      const blob = await getBlob()
      await shareBlob(blob, filename, shareTitle)
    } catch (err) {
      console.error('[ResultShareBar] Share failed:', err)
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="result-share-row">
      <button
        type="button"
        onClick={handleDownload}
        disabled={!!busy}
        aria-label="Download image"
        className="secondary-btn result-share-action"
        style={btnStyle(busy === 'download')}
      >
        {busy === 'download' ? '…' : '⬇ DOWNLOAD'}
      </button>
      <button
        type="button"
        onClick={handleShare}
        disabled={!!busy}
        aria-label="Share image"
        className="secondary-btn result-share-action"
        style={btnStyle(busy === 'share')}
      >
        {busy === 'share' ? '…' : '↑ SHARE'}
      </button>
    </div>
  )
}

function btnStyle(active: boolean): React.CSSProperties {
  return {
    flex: 1,
    width: 'auto',
    color: active ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.72)',
    borderColor: 'rgba(255,255,255,0.18)',
    padding: '13px 8px',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.06em',
    cursor: active ? 'not-allowed' : 'pointer',
    opacity: active ? 0.7 : 1,
  }
}
