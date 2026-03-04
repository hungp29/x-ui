import { useTranslation } from 'react-i18next'
import {
  IconFile,
  IconPieChart2Stroked,
  IconCalendar,
  IconMail,
  IconCamera,
  IconGlobe,
  IconSetting,
  IconCloud,
} from '@douyinfe/semi-icons'
import type { AppItem } from '../components/AppGrid'

type AppKey = 'word' | 'finance' | 'calendar' | 'mail' | 'photos' | 'maps' | 'storage' | 'settings'

const APP_ICONS: Record<AppKey, { icon: React.ReactNode; href: string }> = {
  word:     { icon: <IconFile />,              href: '/apps/word' },
  finance:  { icon: <IconPieChart2Stroked />,  href: '/apps/finance' },
  calendar: { icon: <IconCalendar />,          href: '/apps/calendar' },
  mail:     { icon: <IconMail />,              href: '/apps/mail' },
  photos:   { icon: <IconCamera />,            href: '/apps/photos' },
  maps:     { icon: <IconGlobe />,             href: '/apps/maps' },
  storage:  { icon: <IconCloud />,             href: '/apps/storage' },
  settings: { icon: <IconSetting />,           href: '/settings' },
}

const APP_KEYS: AppKey[] = [
  'word', 'finance', 'calendar', 'mail', 'photos', 'maps', 'storage', 'settings',
]

export function useLocalizedApps(): AppItem[] {
  const { t } = useTranslation()

  return APP_KEYS.map((key) => ({
    key,
    name: t(`apps.${key}.name`),
    description: t(`apps.${key}.description`),
    icon: APP_ICONS[key].icon,
    href: APP_ICONS[key].href,
  }))
}
