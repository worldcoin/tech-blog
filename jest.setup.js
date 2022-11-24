import fetch from 'jest-fetch-mock'
import {TextDecoder, TextEncoder} from 'util'
jest.setMock('node-fetch', fetch)
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
