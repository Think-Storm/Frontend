import { ReactNode, CSSProperties } from 'react'
import cx from './cx'

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  className?: string
  style?: CSSProperties
  children: ReactNode
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  className,
  style,
  children,
}) => {
  const Component = variant
  return (
    <Component className={cx('Typography', variant, className)} style={style}>
      {children}
    </Component>
  )
}

export default Typography
