import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography, Button } from '@douyinfe/semi-ui'
import { IconApps } from '@douyinfe/semi-icons'
import { AppGrid } from '../components/AppGrid'
import { useIsMobile } from '../hooks/useIsMobile'
import { useLocalizedApps } from '../data/apps'

const { Title, Paragraph } = Typography

const DESKTOP_LIMIT = 8
const MOBILE_LIMIT = 4

export default function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const allApps = useLocalizedApps()

  const featuredApps = allApps.slice(0, isMobile ? MOBILE_LIMIT : DESKTOP_LIMIT)

  return (
    <div className="page-padding" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Title heading={3} style={{ marginBottom: 4 }}>
          {t('home.title')}
        </Title>
        <Paragraph type="tertiary">{t('home.subtitle')}</Paragraph>
      </div>

      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Title heading={6} style={{ margin: 0 }}>
            {t('home.apps')}
          </Title>
          <Button
            theme="borderless"
            size="small"
            icon={<IconApps />}
            onClick={() => navigate('/apps')}
          >
            {t('home.seeAll')}
          </Button>
        </div>
        <AppGrid apps={featuredApps} />
      </section>
    </div>
  )
}
