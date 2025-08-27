import { Bell } from 'lucide-react'
import { Button } from './button'

const BellButton = () => {
  const handleClick = () => {
    console.log('Bell button clicked!')
  }
  return (
    <>
      <Button
        asChild
        onClick={handleClick}
        variant="ghost"
        className="h-auto min-h-0 min-w-0 justify-center p-0"
        aria-label="View notifications"
      >
        <Bell className="h-5 w-5 cursor-pointer on" />
      </Button>
    </>
  )
}
export default BellButton
