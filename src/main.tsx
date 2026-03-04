import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LocaleProvider } from '@douyinfe/semi-ui'
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US'
import '@douyinfe/semi-ui/dist/css/semi.min.css'
import './styles/index.css'
import './i18n'
import { ThemeProvider } from './context/ThemeContext'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider locale={en_US}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
)
