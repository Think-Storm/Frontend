import React, { ReactNode } from 'react'
import Flex from '@/components/common/layout/Flex'
import Typography from '@/components/common/typography/Typography'
import Button from '@/components/common/button/Button'
import cx from './cx'

interface AuthFormProps {
  children?: ReactNode
}

const AuthForm: React.FC<AuthFormProps> & {
  Header: React.FC<AuthFormProps>
  Content: React.FC<AuthFormProps>
  Footer: React.FC<
    AuthFormProps & { text: string; disabled: boolean; onSubmit: () => void }
  >
} = ({ children }) => {
  return (
    <Flex.ColBetweenCenter className={cx('AuthForm')}>
      {children}
    </Flex.ColBetweenCenter>
  )
}

const AuthFormHeader = ({ children }: AuthFormProps) => (
  <Flex.RowCenter className={cx('Header')}>
    <Typography variant="h1">{children}</Typography>
  </Flex.RowCenter>
)

const AuthFormContent = ({ children }: AuthFormProps) => (
  <form className={cx('Content')}>
    <Flex.ColStartStart>{children}</Flex.ColStartStart>
  </form>
)

const AuthFormFooter = ({
  text,
  disabled,
  onSubmit,
  children,
}: AuthFormProps & {
  text: string
  disabled: boolean
  onSubmit: () => void
}) => (
  <Flex.ColCenter className={cx('Footer')}>
    <Button type="submit" text={text} onClick={onSubmit} disabled={disabled} />
    {children}
  </Flex.ColCenter>
)

AuthForm.Header = AuthFormHeader
AuthForm.Content = AuthFormContent
AuthForm.Footer = AuthFormFooter

export default AuthForm
