import {render} from '@testing-library/react'
import {SocialLink} from '../index'

describe('SocialLink', () => {
  it('renders properly', async () => {
    const {container} = render(<SocialLink href="/" icon="twitter" />)
    expect(container).toBeTruthy()
  })
})
