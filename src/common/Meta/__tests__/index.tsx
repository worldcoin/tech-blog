import {render} from '@testing-library/react'
import {Meta} from '../index'

describe('Meta', () => {
  it('renders properly', async () => {
    const {container} = render(<Meta>Test</Meta>)
    expect(container).toBeTruthy()
  })
})
