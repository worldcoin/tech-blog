import clsx from 'clsx'
import {Icon} from 'common/Icon'
import {Link} from 'common/Link'
import {layout} from 'common/styles'
import {MenuItem} from 'common/types'
import {memo, useCallback, useEffect, useRef, useState} from 'react'
import {useToggle} from 'usehooks-ts'
import {Nav} from './Nav'
const scrollDelta = 68

export const Header = memo(function Header(props: {menuItems: Array<MenuItem>}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpenedMenu, triggerOpenedMenu, setOpenedMenu] = useToggle()
  const ref = useRef<HTMLDivElement | null>(null)
  const handleCloseMenu = useCallback(() => setOpenedMenu(false), [setOpenedMenu])

  // close menu on click overlay
  useEffect(() => {
    const NavEl = ref.current
    const OverflowEl = NavEl?.parentElement
    if (!NavEl || !OverflowEl) {
      return
    }

    const handler = (event: MouseEvent) => {
      if (event.target !== NavEl) {
        handleCloseMenu()
      }
    }

    OverflowEl.addEventListener('click', handler)

    return () => OverflowEl.removeEventListener('click', handler)
  }, [handleCloseMenu])

  // close menu on back or press esc
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseMenu()
      }
    }

    const handleBack = () => {
      if (isOpenedMenu) {
        history.pushState(null, '', window.location.pathname)
        handleCloseMenu()
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('popstate', handleBack, false)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('popstate', handleBack)
    }
  }, [handleCloseMenu, isOpenedMenu])

  // show or hide menu on scroll
  useEffect(() => {
    const scrollHandler = () => setIsScrolled(window.scrollY >= scrollDelta)
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return (
    <div
      className={clsx(
        layout.paddingHorizontal,
        'z-20 inset-0 grid grid-cols-1fr/auto justify-items-start items-center h-[68px] text-18 font-medium',
        'fixed top-0 transition-colors text-ffffff',
        {
          'bg-transparent': !isScrolled,
          'bg-010101': isScrolled,
        },
      )}
    >
      <Link href="/" className={clsx('flex items-center transition-colors')}>
        <Icon name="logo" className={clsx('w-[142px] lg:w-[154px] h-6 lg:h-6.5')} />
      </Link>

      <button
        className={clsx('relative z-[10000] flex lg:hidden flex-col justify-center w-6 h-6', {
          'text-ffffff': !isOpenedMenu,
          'text-010101': isOpenedMenu,
        })}
        onClick={triggerOpenedMenu}
        type="button"
        aria-label="Mobile menu"
      >
        <svg
          viewBox="0 0 22 2"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx('absolute top-1/2 bg-current transition-all', {
            'rotate-45': isOpenedMenu,
            '-mt-px -translate-y-1.5': !isOpenedMenu,
          })}
          fill="currentColor"
        />

        <svg
          viewBox="0 0 22 2"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx('absolute top-1/2 bg-current transition-all', {
            '-rotate-45': isOpenedMenu,
            '-mt-px translate-y-1.5': !isOpenedMenu,
          })}
          fill="currentColor"
        />
      </button>

      <Nav ref={ref} isShown={isOpenedMenu} closeMenu={handleCloseMenu} menuItems={props.menuItems} />
    </div>
  )
})
