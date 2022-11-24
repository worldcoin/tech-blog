import {createContext, memo, ReactNode, useCallback, useEffect, useMemo, useState} from 'react'

export type SystemThemes = 'light' | 'dark'
export type Themes = SystemThemes | 'system'

type ContextValue = {
  currentTheme: SystemThemes | null
  preferredTheme: Themes | null
  systemTheme: SystemThemes | null
  changePreferredTheme: (value: Themes) => void
  themes: typeof themes
}

const themes = [
  {
    name: 'Light',
    value: 'light',
  },
  {
    name: 'Dark',
    value: 'dark',
  },
  {
    name: 'System',
    value: 'system',
  },
]

export const ThemeContext = createContext<ContextValue>({
  currentTheme: null,
  preferredTheme: null,
  systemTheme: null,
  changePreferredTheme: (_value: Themes) => {},
  themes,
})

export const ThemeProvider = memo(function ThemeProvider(props: {children: ReactNode}) {
  const [systemTheme, setSystemTheme] = useState<SystemThemes | null>(null)
  const [preferredTheme, setPreferredTheme] = useState<Themes>('system')

  const currentTheme = useMemo(() => {
    if (preferredTheme !== 'system') {
      return preferredTheme
    }

    if (preferredTheme === 'system' && systemTheme) {
      return systemTheme
    }

    return null
  }, [preferredTheme, systemTheme])

  // @NOTE: listen system scheme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChangeSystemScheme = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChangeSystemScheme)

    return () => {
      mediaQuery.removeEventListener('change', handleChangeSystemScheme)
    }
  }, [])

  // NOTE: listen change from another tab
  useEffect(() => {
    setPreferredTheme((localStorage.getItem('theme') ?? 'system') as Themes)

    const handleChangeStorage = (event: StorageEvent) => {
      if (event.key !== 'theme') {
        return
      }

      setPreferredTheme(event.newValue as Themes)
    }

    addEventListener('storage', handleChangeStorage)

    return () => {
      removeEventListener('storage', handleChangeStorage)
    }
  }, [])

  // set theme key to body data attribute
  useEffect(() => {
    if (!systemTheme) {
      return
    }

    document.documentElement.dataset['theme'] = preferredTheme === 'system' ? systemTheme : preferredTheme
  }, [systemTheme, preferredTheme])

  const changePreferredTheme = useCallback((value: Themes) => {
    setPreferredTheme(value)
    localStorage.setItem('theme', value)
  }, [])

  const value = useMemo(
    () => ({
      currentTheme,
      systemTheme,
      preferredTheme: preferredTheme,
      changePreferredTheme,
      themes,
    }),
    [changePreferredTheme, currentTheme, preferredTheme, systemTheme],
  )

  return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>
})
