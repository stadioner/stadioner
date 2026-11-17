'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Border } from '@/components/border'
import { Container } from '@/components/container'

interface Props {
  children: ReactNode
  fallbackTitle?: string
  fallbackDescription?: string
}

interface State {
  hasError: boolean
}

export class TakeoverErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Tap Takeover section error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className='bg-brand-action py-16'>
          <Container>
            <Border backgroundLight>
              <div className='bg-brand-primary p-6 md:p-8'>
                <h2 className='text-brand-action text-2xl font-bold'>
                  {this.props.fallbackTitle ?? 'Něco se pokazilo'}
                </h2>
                <p className='text-brand-action/85 mt-3 text-base'>
                  {this.props.fallbackDescription ??
                    'Tuto sekci teď nemůžeme načíst. Obnovte stránku nebo nás kontaktujte přímo.'}
                </p>
              </div>
            </Border>
          </Container>
        </section>
      )
    }

    return this.props.children
  }
}
