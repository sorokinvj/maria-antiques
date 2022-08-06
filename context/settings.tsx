// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'

// @ts-expect-error TS(2307): Cannot find module 'hygraph.config' or its corresp... Remove this comment to see the full error message
import { currencies } from 'hygraph.config'
// @ts-expect-error TS(2307): Cannot find module '@/hooks/use-local-storage' or ... Remove this comment to see the full error message
import useLocalStorage from '@/hooks/use-local-storage'

const SettingsContext = React.createContext()

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SWITCH_CURRENCY':
      return { ...state, activeCurrency: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function SettingsProvider({
  children
}: any) {
  const [savedSettings, saveSettings] = useLocalStorage(
    'hygraph-commerce-reference',
    {
      activeCurrency: currencies.find((currency: any) => Boolean(currency.default))
    }
  )
  const [state, dispatch] = React.useReducer(reducer, savedSettings)
  const [hasMounted, setHasMounted] = React.useState(false)

  const switchCurrency = (currency: any) => dispatch({ type: 'SWITCH_CURRENCY', payload: currency })

  React.useEffect(() => {
    saveSettings(state)
  }, [state, saveSettings])

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <SettingsContext.Provider
      value={{
        ...state,
        switchCurrency
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

const useSettingsContext = () => {
  const context = React.useContext(SettingsContext)

  if (!context)
    throw new Error('useSettingsContext must be used within a SettingsProvider')

  return context
}

export { SettingsProvider, useSettingsContext }
