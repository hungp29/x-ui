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

export const ALL_APPS: AppItem[] = [
  {
    key: 'word',
    name: 'Word',
    icon: <IconFile />,
    description: 'Documents',
    href: '/apps/word',
  },
  {
    key: 'finance',
    name: 'Finance',
    icon: <IconPieChart2Stroked />,
    description: 'Budget & expenses',
    href: '/apps/finance',
  },
  {
    key: 'calendar',
    name: 'Calendar',
    icon: <IconCalendar />,
    description: 'Schedule & events',
    href: '/apps/calendar',
  },
  {
    key: 'mail',
    name: 'Mail',
    icon: <IconMail />,
    description: 'Inbox',
    href: '/apps/mail',
  },
  {
    key: 'photos',
    name: 'Photos',
    icon: <IconCamera />,
    description: 'Media library',
    href: '/apps/photos',
  },
  {
    key: 'maps',
    name: 'Maps',
    icon: <IconGlobe />,
    description: 'Directions & places',
    href: '/apps/maps',
  },
  {
    key: 'storage',
    name: 'Storage',
    icon: <IconCloud />,
    description: 'Files & backups',
    href: '/apps/storage',
  },
  {
    key: 'settings',
    name: 'Settings',
    icon: <IconSetting />,
    description: 'Preferences',
    href: '/settings',
  },
]
