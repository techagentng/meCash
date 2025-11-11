import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import SearchBar from '../SearchBar'

describe('SearchBar', () => {
	beforeEach(() => {
		jest.useFakeTimers()
	})

	afterEach(() => {
		jest.runOnlyPendingTimers()
		jest.useRealTimers()
		jest.clearAllMocks()
	})

	it('calls onSearch after debounce when typing', () => {
		const onSearch = jest.fn()
		render(<SearchBar onSearch={onSearch} />)

		const input = screen.getByLabelText('Search') as HTMLInputElement

		fireEvent.change(input, { target: { value: 'react' } })

		expect(onSearch).not.toHaveBeenCalled()

		act(() => {
			jest.advanceTimersByTime(299)
		})
		expect(onSearch).not.toHaveBeenCalled()

		act(() => {
			jest.advanceTimersByTime(1)
		})

		expect(onSearch).toHaveBeenCalledTimes(1)
		expect(onSearch).toHaveBeenCalledWith('react')
	})

	it('submitting the form calls onSearch immediately and cancels debounce', () => {
		const onSearch = jest.fn()
		const { container } = render(<SearchBar onSearch={onSearch} />)

		const input = screen.getByLabelText('Search') as HTMLInputElement
		const form = container.querySelector('form') as HTMLFormElement

		fireEvent.change(input, { target: { value: 'typescript' } })

		act(() => {
			fireEvent.submit(form)
		})

		expect(onSearch).toHaveBeenCalledTimes(1)
		expect(onSearch).toHaveBeenCalledWith('typescript')

		// Ensure pending debounce does not trigger a second call
		act(() => {
			jest.advanceTimersByTime(500)
		})
		expect(onSearch).toHaveBeenCalledTimes(1)
	})
})

