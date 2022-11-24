import {render} from '@testing-library/react'
import {Section} from '../index'

describe('Section', () => {
  it('renders properly', async () => {
    const {container} = render(<Section title="Section">Section</Section>)
    expect(container).toBeTruthy()
  })
})
