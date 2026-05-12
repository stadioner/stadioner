import posthog from 'posthog-js'

function clearPosthogClientData(): void {
  try {
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.startsWith('ph_') || key.toLowerCase().includes('posthog'))) {
        keysToRemove.push(key)
      }
    }
    for (const key of keysToRemove) {
      localStorage.removeItem(key)
    }
  } catch {
    // ignore
  }

  try {
    const hostname = window.location.hostname
    const parts = document.cookie.split(';')
    for (const part of parts) {
      const name = part.split('=')[0]?.trim()
      if (!name || !name.startsWith('ph_')) {
        continue
      }
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${hostname}`
    }
  } catch {
    // ignore
  }
}

export function enablePosthogAnalytics(): void {
  if (typeof window === 'undefined') {
    return
  }

  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
  if (!token) {
    return
  }

  if (!posthog.__loaded) {
    posthog.init(token, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: '2026-01-30',
      disable_session_recording: true
    })
    return
  }

  if (posthog.has_opted_out_capturing()) {
    posthog.opt_in_capturing()
  }
}

export function disablePosthogAnalytics(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    if (posthog.__loaded) {
      posthog.opt_out_capturing()
      posthog.stopSessionRecording?.()
    }
  } catch {
    // ignore
  }

  clearPosthogClientData()
}

export function isPosthogCaptureAllowed(): boolean {
  return (
    typeof window !== 'undefined' &&
    posthog.__loaded &&
    !posthog.has_opted_out_capturing()
  )
}
