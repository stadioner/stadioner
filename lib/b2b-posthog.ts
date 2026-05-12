import posthog from 'posthog-js'
import { isPosthogCaptureAllowed } from '@/lib/posthog-consent'

type B2bCaptureProps = Record<
  string,
  string | number | boolean | null | undefined
>

export function captureB2bEvent(
  event: string,
  properties?: B2bCaptureProps
): void {
  if (!isPosthogCaptureAllowed()) {
    return
  }
  posthog.capture(event, properties)
}
