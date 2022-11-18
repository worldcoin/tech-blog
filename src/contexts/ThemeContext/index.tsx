import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type SystemThemes = 'light' | 'dark'
export type Themes = SystemThemes | 'system'

type ContextValue = {
  currentTheme: SystemThemes | null
  preferedTheme: Themes | null
  systemTheme: SystemThemes | null
  changePreferedTheme: (value: Themes) => void
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
  preferedTheme: null,
  systemTheme: null,
  changePreferedTheme: (value: Themes) => {},
  themes,
})

export const ThemeProvider = memo(function ThemeProvider(props: {
  children: ReactNode
}) {
  const [systemTheme, setSystemTheme] = useState<SystemThemes | null>(null)
  const [preferedTheme, setPreferedTheme] = useState<Themes>('system')

  const currentTheme = useMemo(() => {
    if (preferedTheme !== 'system') {
      return preferedTheme
    }

    if (preferedTheme === 'system' && systemTheme) {
      return systemTheme
    }

    return null
  }, [preferedTheme, systemTheme])

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
    setPreferedTheme((localStorage.getItem('theme') ?? 'system') as Themes)

    const handleChangeStorage = (event: StorageEvent) => {
      if (event.key !== 'theme') {
        return
      }

      setPreferedTheme(event.newValue as Themes)
    }

    addEventListener('storage', handleChangeStorage)

    return () => {
      removeEventListener('storage', handleChangeStorage)
    }
  }, [])

  useEffect(() => {
    if (!systemTheme) {
      return
    }

    document.documentElement.dataset['theme'] =
      preferedTheme === 'system' ? systemTheme : preferedTheme
  }, [systemTheme, preferedTheme])

  const changePreferedTheme = useCallback((value: Themes) => {
    setPreferedTheme(value)
    localStorage.setItem('theme', value)
  }, [])

  const value = useMemo(
    () => ({
      currentTheme,
      systemTheme,
      preferedTheme,
      changePreferedTheme,
      themes,
    }),
    [currentTheme, systemTheme, preferedTheme, changePreferedTheme]
  )

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  )
})
