//describes

import { render, screen } from "@testing-library/react"
import { CheckNumber } from "."
import userEvent from '@testing-library/user-event'

//tests

const getInput = () => {
    return screen.getByPlaceholderText('Digite um número')
}

describe('<CheckNumber />', () => {
    test('should render a title', () => {
        render(<CheckNumber />)

        const title = screen.getByText('Componente par ou ímpar')

        expect(title).toBeInTheDocument()
    })

    test('should render a input', () => {
        render(<CheckNumber />)

        const input = getInput()

        expect(input).toBeInTheDocument()
    })

    describe('when there is no error', () => {
        test('should render the error message section empty', () => {
            render(<CheckNumber />)

            const alert = screen.getByRole('alert')

            expect(alert).toBeInTheDocument()
            expect(alert).toHaveTextContent('')
        })
    })

    describe('when user types an odd number', () => {
        test('should render ímpar on the screen', () => {
            render(<CheckNumber />)

            const input = getInput()

            userEvent.clear(input)
            userEvent.type(input, '3')

            const section = screen.getByRole('contentinfo')

            expect(section).toHaveTextContent('Ímpar')
        })
    })

    describe('when user types an even number', () => {
        test('should render par on the screen', () => {
            render(<CheckNumber />)

            const input = getInput()

            userEvent.clear(input)
            userEvent.type(input, '12')

            const section = screen.getByRole('contentinfo')

            expect(section).toHaveTextContent('Par')
        })
    })

    describe('when the user types a not number value', () => {
        test('should render the error message section with the error message', () => {
            render(<CheckNumber />)

            const input = getInput()

            userEvent.clear(input)
            userEvent.type(input, 'a')

            const alert = screen.getByRole('alert')

            expect(alert).toHaveTextContent('Digite apenas números')
        })
    })
})