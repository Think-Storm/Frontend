import { FC, ReactNode } from 'react'
import cx from './cx'

type Direction = 'row' | 'column'
type Justify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'evenly'
  | 'around'
  | 'stretch'
type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'baseline'
  | 'stretch'
  | 'between'
  | 'evenly'
  | 'around'

interface FlexProps {
  direction?: Direction
  justify?: Justify
  align?: Align
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

const createFlexComponent =
  (direction: Direction, justify: Justify, align: Align): FC<FlexProps> =>
  ({ children, className, style }) => {
    return (
      <div
        className={cx(
          'Flex',
          `${direction}`,
          `justify-${justify}`,
          `align-${align}`,
          className,
        )}
        style={style}
      >
        {children}
      </div>
    )
  }

const Flex = ({ children, className }: FlexProps) => (
  <div className={className}>{children}</div>
)

Flex.ColCenter = createFlexComponent('column', 'center', 'center')
Flex.ColStartCenter = createFlexComponent('column', 'start', 'center')
Flex.ColEndCenter = createFlexComponent('column', 'end', 'center')
Flex.ColBetweenCenter = createFlexComponent('column', 'between', 'center')
Flex.ColBetweenStart = createFlexComponent('column', 'between', 'start')
Flex.ColEvenlyCenter = createFlexComponent('column', 'evenly', 'center')
Flex.ColAroundCenter = createFlexComponent('column', 'around', 'center')
Flex.ColStretchCenter = createFlexComponent('column', 'stretch', 'center')
Flex.ColCenterStart = createFlexComponent('column', 'center', 'start')
Flex.ColCenterEnd = createFlexComponent('column', 'center', 'end')
Flex.ColCenterBetween = createFlexComponent('column', 'center', 'between')
Flex.ColCenterEvenly = createFlexComponent('column', 'center', 'evenly')
Flex.ColCenterAround = createFlexComponent('column', 'center', 'around')
Flex.ColCenterStretch = createFlexComponent('column', 'center', 'stretch')
Flex.ColStartStart = createFlexComponent('column', 'start', 'start')
Flex.ColStartEnd = createFlexComponent('column', 'start', 'end')
Flex.ColStartStretch = createFlexComponent('column', 'start', 'stretch')

Flex.RowCenter = createFlexComponent('row', 'center', 'center')
Flex.RowStartCenter = createFlexComponent('row', 'start', 'center')
Flex.RowEndCenter = createFlexComponent('row', 'end', 'center')
Flex.RowBetweenCenter = createFlexComponent('row', 'between', 'center')
Flex.RowBetweenStart = createFlexComponent('row', 'between', 'start')
Flex.RowBetweenEnd = createFlexComponent('row', 'between', 'end')
Flex.RowEvenlyCenter = createFlexComponent('row', 'evenly', 'center')
Flex.RowAroundCenter = createFlexComponent('row', 'around', 'center')
Flex.RowStretchCenter = createFlexComponent('row', 'stretch', 'center')
Flex.RowCenterStart = createFlexComponent('row', 'center', 'start')
Flex.RowCenterEnd = createFlexComponent('row', 'center', 'end')
Flex.RowCenterEvenly = createFlexComponent('row', 'center', 'evenly')
Flex.RowCenterAround = createFlexComponent('row', 'center', 'around')
Flex.RowCenterStretch = createFlexComponent('row', 'center', 'stretch')
Flex.RowStartStart = createFlexComponent('row', 'start', 'start')
Flex.RowStartEnd = createFlexComponent('row', 'start', 'end')
Flex.RowStartStretch = createFlexComponent('row', 'start', 'stretch')

export default Flex
