import html2canvas from 'html2canvas'

/**
 * Captures an HTMLElement as a high-resolution PNG Blob.
 * Excludes browser chrome; preserves colours, spacing, and branding.
 */
export async function captureElement(el: HTMLElement): Promise<Blob> {
  const scale = Math.max(window.devicePixelRatio || 1, 2) // at least 2× for retina
  const canvas = await html2canvas(el, {
    scale,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: null, // preserve transparent / dark backgrounds
  })
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob)
      else reject(new Error('canvas.toBlob returned null'))
    }, 'image/png')
  })
}

/** Triggers a local file download for the given Blob. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  // clean up after the browser has had time to start the download
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 1000)
}

/**
 * Shares the Blob via the Web Share API when supported,
 * falling back to a direct browser download.
 */
export async function shareBlob(
  blob: Blob,
  filename: string,
  title = 'Check out my BRAYN proof',
): Promise<void> {
  const file = new File([blob], filename, { type: 'image/png' })

  // Native share (mobile Safari, Android Chrome, etc.)
  if (
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [file] })
  ) {
    try {
      await navigator.share({ files: [file], title, text: title })
      return
    } catch (err) {
      // User cancelled or share failed — fall through to download fallback
      if ((err as DOMException).name === 'AbortError') return
    }
  }

  // Fallback: open in new tab so the user can long-press / right-click to save
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank')
  if (!win) {
    // Popup blocked — trigger download instead
    downloadBlob(blob, filename)
  }
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
