import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'

const renderWithProviders = async (component: ReactNode) => {
  const user = userEvent.setup()

  return {
    user,
    ...render(component),
  }
}

export default renderWithProviders
