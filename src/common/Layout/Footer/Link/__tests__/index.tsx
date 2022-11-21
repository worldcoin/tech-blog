import {render} from '@testing-library/react'
import {Link} from '../index'

describe('Link', () => {
  it('renders properly', async () => {
    const {container} = render(<Link href="/">Link</Link>)
    expect(container).toBeTruthy()
  })
})
