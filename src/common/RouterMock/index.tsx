import {RouterContext} from 'next/dist/shared/lib/router-context'
import Router from 'next/router'
import {ReactNode} from 'react'

export const RouterMock = (props: {children: ReactNode}) => {
  const mockRouter = {
    asPath: '/',
    pathname: '',
    prefetch: () => {},
    push: () => {},
    query: {},
  }

  // @ts-ignore
  Router.router = mockRouter

  // @ts-ignore
  return <RouterContext.Provider value={mockRouter}>{props.children}</RouterContext.Provider>
}
