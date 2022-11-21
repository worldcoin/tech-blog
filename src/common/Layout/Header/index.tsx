import clsx from 'clsx'
import {Icon} from 'common/Icon'
import {Link} from 'common/Link'
import {layout} from 'common/styles'
import {MenuItem} from 'common/types'
import {memo, useCallback, useEffect, useRef} from 'react'
import {useOnClickOutside, useToggle} from 'usehooks-ts'
import {Nav} from './Nav'
const scrollDelta = 550

export const Header = memo(function Header(props: {menuItems: Array<MenuItem>}) {
  const [isOpenedMenu, triggerOpenedMenu, setOpenedMenu] = useToggle()
  const [isShowHeader, , setShowHeader] = useToggle(true)
  const nodeReference = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(
    nodeReference,
    useCallback(() => setOpenedMenu(false), [setOpenedMenu]),
  )

  // close menu on back or press esc
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenedMenu(false)
      }
    }

    const handleBack = () => {
      if (isOpenedMenu) {
        history.pushState(null, '', window.location.pathname)
        setOpenedMenu(false)
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('popstate', handleBack, false)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('popstate', handleBack)
    }
  }, [isOpenedMenu, setOpenedMenu])

  // show or hide menu on scroll
  useEffect(() => {
    let prevPos: number = 0

    const scrollHandler = () => {
      setShowHeader(window.scrollY <= scrollDelta || prevPos > window.scrollY)
      prevPos = window.scrollY
    }

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [setShowHeader])

  return (
    <div
      className={clsx(
        layout.paddingHorizontal,
        'z-20 inset-0 grid grid-cols-1fr/auto justify-items-start items-center h-[68px] text-18 font-medium',
        'fixed top-0 transition-transform',
        {
          '-translate-y-full': !isShowHeader,
        },
      )}
    >
      <Link href="/" className={clsx('flex items-center transition-colors')}>
        <Icon name="logo" className={clsx('w-[142px] lg:w-[154px] h-6 lg:h-6.5')} />
      </Link>

      <button
        className={clsx('relative z-30 flex lg:hidden flex-col justify-center w-6 h-6')}
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

      <Nav
        isShown={isOpenedMenu}
        nodeReference={nodeReference}
        closeMenu={() => setOpenedMenu(false)}
        menuItems={props.menuItems}
      />
    </div>
  )
})
