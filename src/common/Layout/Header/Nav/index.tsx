import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock'
import clsx from 'clsx'
import {generateDecoratedLinkClassName} from 'common/helpers'
import {Link} from 'common/Link'
import {SubscribeForm} from 'common/SubscribeForm'
import {MenuItem} from 'common/types'
import {memo, MutableRefObject, useEffect} from 'react'
import {NavItem} from './NavItem'

export const Nav = memo(function Nav(props: {
  className?: string
  isShown: boolean
  nodeReference: MutableRefObject<HTMLDivElement | null>
  closeMenu: () => void
  menuItems: Array<MenuItem>
}) {
  const classList = ['overflow-hidden', 'overscroll-none', 'lg:overscroll-auto', 'lg:overflow-auto', 'w-screen']

  // NOTE Adds necessary classnames to body when mobile nav is active/inactive
  useEffect(() => {
    if (props.isShown) {
      document.body.classList.add(...classList)
      disableBodyScroll(document.body)
      return
    }

    if (
      document.body.classList.contains('overflow-hidden') &&
      document.body.classList.contains('overscroll-none') &&
      document.body.classList.contains('lg:overscroll-auto') &&
      document.body.classList.contains('lg:overscroll-auto')
    ) {
      document.body.classList.remove(...classList)
      enableBodyScroll(document.body)
    }
  })

  // Translate added to prevent bug with height of nested fixed elements
  return (
    <div
      className={clsx(
        'fixed lg:static inset-0 h-screen lg:h-auto bg-000000 translate-x-0 transition-all duration-300',
        props.isShown ? 'visible bg-000000/50 lg:bg-000000/0' : 'invisible lg:visible bg-000000/0',
        props.className,
      )}
    >
      <div
        ref={props.nodeReference}
        className={clsx(
          'fixed z-20 right-0 grid content-between w-full sm:w-auto h-full bg-ffffff dark:bg-010101',
          'sm:p-7.5 px-3.5 sm:pl-12 pt-36 sm:pt-40 pb-10 transition-transform/opacity duration-300',
          'lg:static lg:h-auto lg:p-0 lg:bg-transparent',
          {'translate-x-full lg:translate-x-0': !props.isShown},
        )}
      >
        <div className="grid gap-x-7.5 gap-y-3.5 lg:grid-flow-col justify-items-start">
          {props.menuItems.map((item: MenuItem, index: number) => (
            <NavItem key={`menuItem-${index}`} href={item.url} onClick={props.closeMenu}>
              {item.title}
            </NavItem>
          ))}
        </div>

        <SubscribeForm className="lg:hidden w-full" isStaticArrow />

        <div className="grid lg:hidden gap-x-5 gap-y-7.5 grid-cols-2">
          <Link
            href="/press"
            onClick={props.closeMenu}
            className={clsx(
              'justify-self-start text-16',
              generateDecoratedLinkClassName({activeCondition: 'hover:before:w-full'}),
            )}
          >
            Press
          </Link>

          <Link
            href="/become-an-operator"
            onClick={props.closeMenu}
            className={clsx(
              'row-start-2 justify-self-start text-16',
              generateDecoratedLinkClassName({activeCondition: 'hover:before:w-full'}),
            )}
          >
            Orb Operators
          </Link>

          <a
            href="http://twitter.com/worldcoin"
            target="_blank"
            className={clsx(
              'justify-self-start text-16',
              generateDecoratedLinkClassName({activeCondition: 'hover:before:w-full'}),
            )}
            rel="noreferrer"
          >
            Twitter
          </a>

          <a
            href="https://www.linkedin.com/company/worldcoinfoundation"
            target="_blank"
            className={clsx(
              'justify-self-start text-16',
              generateDecoratedLinkClassName({activeCondition: 'hover:before:w-full'}),
            )}
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
})
