export const useDarkMode = () => {
  const isDark = useState('darkMode', () => true)

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem('darkMode', isDark.value ? 'dark' : 'light')
    }
  }

  const initDarkMode = () => {
    if (import.meta.client) {
      const savedMode = localStorage.getItem('darkMode')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      isDark.value = savedMode ? savedMode === 'dark' : prefersDark
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }

  return {
    isDark,
    toggleDarkMode,
    initDarkMode
  }
}
