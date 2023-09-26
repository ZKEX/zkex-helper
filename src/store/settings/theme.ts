import { MuiThemeType } from 'styles/Themes'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist<{
    currentTheme: MuiThemeType
    updateTheme: (theme: MuiThemeType) => void
  }>(
    (set) => ({
      currentTheme: MuiThemeType.dark,
      updateTheme: (theme) => {
        set(() => ({ currentTheme: theme }))
      },
    }),
    {
      name: 'zkex_helper_theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
