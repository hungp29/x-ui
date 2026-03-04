import { useTranslation } from 'react-i18next'
import { Typography } from '@douyinfe/semi-ui'
import { AppGrid } from '../components/AppGrid'
import { useLocalizedApps } from '../data/apps'

const { Title, Paragraph } = Typography

export default function AllAppsPage() {
  const { t } = useTranslation()
  const allApps = useLocalizedApps()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Title heading={3} style={{ marginBottom: 4 }}>
          {t('allApps.title')}
        </Title>
        <Paragraph type="tertiary">
          {t('allApps.subtitle', { count: allApps.length })}
        </Paragraph>
      </div>

      <AppGrid apps={allApps} />
    </div>
  )
}
