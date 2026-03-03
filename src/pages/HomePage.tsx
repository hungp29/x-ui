import { Typography } from '@douyinfe/semi-ui'
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
import { AppGrid } from '../components/AppGrid'
import type { AppItem } from '../components/AppGrid'

const { Title, Paragraph } = Typography

const apps: AppItem[] = [
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

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <Title heading={3} style={{ marginBottom: 4 }}>
          Home
        </Title>
        <Paragraph type="tertiary">Your applications</Paragraph>
      </div>

      <AppGrid apps={apps} title="All Apps" />
    </div>
  )
}
