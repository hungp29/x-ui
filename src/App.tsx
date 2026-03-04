import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AllAppsPage from './pages/AllAppsPage'
import SettingsPage from './pages/SettingsPage'
import WordPage from './pages/WordPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/apps" element={<AllAppsPage />} />
        <Route path="/apps/word" element={<WordPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
