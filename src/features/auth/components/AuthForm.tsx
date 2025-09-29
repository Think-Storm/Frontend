'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BaseProps = {
  children: ReactNode
  className?: string
}

type AuthFormHeaderProps = {
  title: string
  description: string
  className?: string
}

type AuthFormContentComponent = React.FC<BaseProps> & {
  Fields: React.FC<BaseProps>
  Actions: React.FC<BaseProps>
  Links: React.FC<BaseProps>
}

type AuthFormComponent = React.FC<BaseProps> & {
  Header: React.FC<AuthFormHeaderProps>
  Content: AuthFormContentComponent
}

const AuthFormBase: React.FC<BaseProps> = ({ children, className }) => (
  <div
    className={cn(
      'w-full flex flex-col justify-center items-center gap-6',
      className,
    )}
  >
    {children}
  </div>
)

const AuthFormHeader: React.FC<AuthFormHeaderProps> = ({
  title,
  description,
  className,
}) => (
  <div
    className={cn('flex flex-col justify-center items-center gap-1', className)}
  >
    <h1 className="text-3xl font-semibold tracking-wide text-center">
      {title}
    </h1>
    <p className="text-sm text-neutral-500 tracking-wide text-center">
      {description}
    </p>
  </div>
)

const AuthFormContent: React.FC<BaseProps> = ({ children, className }) => (
  <div
    className={cn(
      'w-full flex flex-col justify-center items-center mt-5',
      className,
    )}
  >
    {children}
  </div>
)

const AuthFormContentFields: React.FC<BaseProps> = ({
  children,
  className,
}) => <div className={className}>{children}</div>

const AuthFormContentActions: React.FC<BaseProps> = ({
  children,
  className,
}) => (
  <div className={cn('flex flex-col gap-4 w-full mt-5', className)}>
    {children}
  </div>
)

const AuthFormContentLinks: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('text-center text-sm text-gray-500 pt-7', className)}>
    {children}
  </div>
)

const AuthForm = Object.assign(AuthFormBase, {
  Header: AuthFormHeader,
  Content: Object.assign(AuthFormContent, {
    Fields: AuthFormContentFields,
    Actions: AuthFormContentActions,
    Links: AuthFormContentLinks,
  }) as AuthFormContentComponent,
}) as AuthFormComponent

export default AuthForm
