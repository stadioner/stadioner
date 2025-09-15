import { redirect } from 'next/navigation'

export default function BlogPage() {
  // Redirect to Czech language by default
  redirect('/clanky/cs')
}
