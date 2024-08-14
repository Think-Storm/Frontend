import { forwardRef, ReactNode } from 'react'
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form'
import Flex from '../layout/Flex'
import cx from './cx'

interface InputProps {
  label?: string
  name: string
  type: string
  placeholder?: string
  register?: UseFormRegister<FieldValues>
  rules?: Record<string, any>
  errors?: FieldErrors<FieldValues>
  styles?: React.CSSProperties
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    label,
    name,
    type,
    placeholder = '',
    register,
    rules,
    errors,
    styles,
    ...props
  },
  ref,
) => {
  return (
    <Flex.ColStartStart className={cx('Input')}>
      {label && (
        <label htmlFor={name} className={cx('label')}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={cx('field', errors && errors[name] ? 'field-error' : '')}
        aria-label={name}
        aria-labelledby={name}
        aria-invalid={errors && errors[name] ? 'true' : 'false'}
        aria-describedby={`${name}-error ${name}-hint`}
        style={{ ...styles }}
        {...(register ? register(name, rules) : {})}
        {...props}
      />
      <div className={cx('error-message')} role="alert">
        {errors && errors[name] && (
          <small id={`${name}-error`}>
            {errors[name]?.message as ReactNode}
          </small>
        )}
      </div>
    </Flex.ColStartStart>
  )
}

export default forwardRef(Input)
