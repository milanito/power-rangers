import React from 'react'
import { render } from 'react-testing-library'

import Content, { HTMLContent } from './index'

describe('Content', () => {
  describe('Normal content', () => {
    it('renders correctly', () => {
      const testId = 'render-content-test'
      const { getByTestId } = render(<Content
        content={testId}
        data-testid={testId} />)

      expect(getByTestId(testId)).toHaveTextContent(testId)
    })

    it('renders correctly with the right class name', () => {
      const testId = 'content-class-test'
      const { getByTestId } = render(<Content
        content={testId}
        className={testId}
        data-testid={testId} />)

      expect(getByTestId(testId)).toHaveClass(testId)
    })
  })

  describe('HTML content', () => {
    it('renders correctly', () => {
      const testId = 'render-content-test'
      const content = '<span data-testid="child"></span>'
      const { getByTestId } = render(<HTMLContent
        content={content}
        data-testid={testId} />)

      expect(getByTestId(testId)).toContainHTML(content)
    })

    it('renders correctly with the right class name', () => {
      const testId = 'content-class-test'
      const content = '<span data-testid="child"></span>'
      const { getByTestId } = render(<HTMLContent
        content={content}
        className={testId}
        data-testid={testId} />)

      expect(getByTestId(testId)).toHaveClass(testId)
    })
  })
})
