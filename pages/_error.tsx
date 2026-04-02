import NextErrorComponent, { type ErrorProps } from 'next/error'

export default function ErrorPage({ statusCode }: ErrorProps) {
  return <NextErrorComponent statusCode={statusCode} />
}
