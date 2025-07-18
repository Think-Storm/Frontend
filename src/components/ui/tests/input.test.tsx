// import { screen } from '@testing-library/react'
// import render from '@/utils/test/render'
// import { Input } from '../input'

// describe('Input', () => {
//   it('should render a placeholder', async () => {
//     await render(<Input placeholder="test" />)

//     const textInput = screen.getByPlaceholderText('test')

//     expect(textInput).toBeInTheDocument()
//   })

//   it('should call onChange when user types text', async () => {
//     const spy = vi.fn()

//     const { user } = await render(
//       <Input onChange={spy} placeholder="Type your text here." />,
//     )

//     const textInput = screen.getByPlaceholderText('Type your text here.')

//     await user.type(textInput, 'test')

//     expect(textInput).toHaveValue('test')
//   })

//   it('should call onFocus when input is focused', async () => {
//     const spy = vi.fn()

//     const { user } = await render(
//       <Input onFocus={spy} placeholder="Type your text here." />,
//     )

//     const textInput = screen.getByPlaceholderText('Type your text here.')

//     await user.click(textInput)

//     expect(spy).toHaveBeenCalled()
//   })
// })
