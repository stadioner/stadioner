'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { Border } from './border'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

interface ToastContextType {
  showToast: (
    message: string,
    type?: 'success' | 'error' | 'info',
    duration?: number
  ) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback(
    (
      message: string,
      type: 'success' | 'error' | 'info' = 'success',
      duration: number = 10000
    ) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newToast: Toast = { id, message, type, duration }

      setToasts(prev => [...prev, newToast])

      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
      }, duration)
    },
    []
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className='fixed bottom-4 right-4 z-[1002] space-y-2'>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const ToastItem = ({ toast }: { toast: Toast }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <div className='w-4 h-4 bg-brand-action rounded-full flex items-center justify-center flex-shrink-0'>
            <svg
              className='w-3 h-3 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
        )
      case 'error':
        return (
          <div className='w-4 h-4 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0'>
            <svg
              className='w-3 h-3 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
        )
      case 'info':
        return (
          <div className='w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0'>
            <svg
              className='w-3 h-3 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
        )
    }
  }

  return (
    <div className='animate-in slide-in-from-right-2 duration-300'>
      <Border backgroundLight className='w-full max-w-sm'>
        <div className='bg-brand-primary p-4 text-brand-action font-mohave flex items-start gap-3'>
          {getIcon()}
          <div className='flex-1'>
            <p className='text-sm font-medium'>{toast.message}</p>
          </div>
        </div>
      </Border>
    </div>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
