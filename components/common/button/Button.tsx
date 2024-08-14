import React, { ButtonHTMLAttributes } from 'react'
import cx from './cx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  text: string
  className?: string
  ariaLabel?: string
  disabled?: boolean
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className,
  text,
  variant = 'primary',
  ariaLabel = 'submit button',
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cx('Button', variant, className)}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  )
}

export default Button
